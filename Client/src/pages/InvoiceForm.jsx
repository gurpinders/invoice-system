import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function InvoiceForm(){
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [entries, setEntries] = useState([]);
    const [invoiceId, setInvoiceId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [entryDate, setEntryDate] = useState('');
    const [entryTicket, setEntryTicket] = useState('');
    const [entryHaulFrom, setEntryHaulFrom] = useState('');
    const [entryHaulTo, setEntryHaulTo] = useState('');
    const [entryWeight, setEntryWeight] = useState('');
    const [entryRate, setEntryRate] = useState('');
    const [fromLocations, setFromLocations] = useState([]);
    const [toLocations, setToLocations] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = id !== undefined && id !== "new";

    const fetchInvoices = useCallback(async() => {
        try {
            const response = await axios.get(`http://localhost:3001/api/invoices/${id}`);
            const invoice = response.data;
            setInvoiceNumber(invoice.invoiceNumber);
            setEntries(invoice.entries);
            setInvoiceId(invoice._id);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching invoice:', error);
            setLoading(false);
        }
    }, [id])

    const handleSaveInvoice = async() => {
        try {
            if(!isEditMode){
                const response = await axios.post('http://localhost:3001/api/invoices', {invoiceNumber});
                setInvoiceId(response.data._id);
                alert("Invoice Created Successfully!");
            }
        } catch (error) {
            console.error('Error saving invoice:', error);
            alert('Error saving invoice');
        }
    }

    const fetchLocations = useCallback(async() => {
        try {
            const fromResponse = await axios.get('http://localhost:3001/api/locations/from');
            const toResponse = await axios.get('http://localhost:3001/api/locations/to');
            setFromLocations(fromResponse.data);
            setToLocations(toResponse.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    }, [])

    const handleAddEntry = async() => {
        if (!invoiceId) {
            alert('Please create an invoice first');
            return;
        }
        
        if (!entryDate || !entryTicket || !entryHaulFrom || !entryHaulTo || !entryWeight || !entryRate) {
            alert('Please fill all fields');
            return;
        }
        
        try {
            const entryData = {
                date: entryDate,
                ticket: entryTicket,
                haulFrom: entryHaulFrom,
                haulTo: entryHaulTo,
                weight: entryWeight,
                ratePerTonne: entryRate
            };
            const response = await axios.post(`http://localhost:3001/api/invoices/${invoiceId}/entries`,entryData);
            setEntries(response.data.entries);
            setEntryDate('');
            setEntryTicket('');
            setEntryHaulFrom('');
            setEntryHaulTo('');
            setEntryWeight('');
            setEntryRate('');
            alert('Entry added successfully!');
        } catch (error) {
            console.error('Error adding entry:', error);
            alert('Error adding entry');
        }
    }

    const handleDeleteEntry = async (entryId) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
          try {
            const response = await axios.delete(
              `http://localhost:3001/api/invoices/${invoiceId}/entries/${entryId}`
            );
            setEntries(response.data.entries);
            alert('Entry deleted successfully!');
          } catch (error) {
            console.error('Error deleting entry:', error);
            alert('Error deleting entry');
          }
        }
    };

    const generatePDF = () => {
        if (!invoiceId || entries.length === 0) {
            alert('Please create an invoice and add entries before generating PDF');
            return;
        }

        const doc = new jsPDF();
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('1391495 Ontario Inc.', 20, 20);
        doc.text('O/A L.S. Haulage', 20, 27);

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.text('4 Yellow Avens Blvd', 20, 34);
        doc.text('Brampton, Ontario L6R 0K5', 20, 39);

        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Strada Aggregates Inc.', 140, 20);
        doc.text('30 Floral Parkway', 140, 27);

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.text('Concord, Ontario', 140, 34);
        doc.text('L4K 4R1', 140, 39);

        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('INVOICE', 105, 55, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`Invoice Number: ${invoiceNumber}`, 20, 70);

        const tableData = entries.map(entry => [
            new Date(entry.date).toLocaleDateString(),
            entry.ticket,
            'B. Sandhu', 
            '127A',        
            entry.haulFrom,
            entry.haulTo,
            entry.weight.toFixed(2),
            `$${entry.ratePerTonne.toFixed(2)}`,
            `$${(entry.weight * entry.ratePerTonne).toFixed(2)}`
        ]);
        
        autoTable(doc, {
            startY: 80,
            head: [['Date', 'Ticket', 'Driver', 'Truck', 'Haul From', 'Haul To', 'Weight', 'Rate/Tonne', 'Amount']],
            body: tableData,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            columnStyles: {
                6: { halign: 'right' },
                7: { halign: 'right' },
                8: { halign: 'right' }
            }
        });

        const subtotal = entries.reduce((sum, entry) => sum + (entry.weight * entry.ratePerTonne), 0);
        const fee = subtotal * 0.07;
        const total = subtotal - fee;

        const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 150;

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        
        const totalsX = 140;
        doc.text(`Subtotal:`, totalsX, finalY);
        doc.text(`$${subtotal.toFixed(2)}`, 190, finalY, { align: 'right' });
        
        doc.text(`Less 7% Fee:`, totalsX, finalY + 7);
        doc.text(`$${fee.toFixed(2)}`, 190, finalY + 7, { align: 'right' });
        
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.line(totalsX, finalY + 12, 190, finalY + 12);
        doc.text(`Total:`, totalsX, finalY + 19);
        doc.text(`$${total.toFixed(2)}`, 190, finalY + 19, { align: 'right' });

        doc.save(`Invoice_${invoiceNumber}.pdf`);
    }

    useEffect(() =>{
        fetchLocations();
        if(isEditMode){
            fetchInvoices();
        }else{

            setLoading(false);
        }
    },[id, isEditMode, fetchInvoices, fetchLocations])

    useEffect(() => {
        const fetchRate = async () => {
          if (entryHaulFrom && entryHaulTo) {
            try {
              const rateResponse = await axios.get(`http://localhost:3001/api/rates/search?haulFrom=${entryHaulFrom}&haulTo=${entryHaulTo}`);
              setEntryRate(rateResponse.data.rate);
            } catch (error) {
              console.error('Error fetching rate:', error);
            }
          }
        };
        fetchRate();
      }, [entryHaulFrom, entryHaulTo]);

    if(loading){
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
            <button onClick={() => navigate("/")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition mb-6"> ← Back To Dashboard</button>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{isEditMode ? "Edit Invoice" : "Create New Invoice"}</h1>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number (Period):</label>
                <input 
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-gray-700 font-medium">Driver: B. Sandhu</p>
                <p className="text-gray-700 font-medium">Truck: 127A</p>
            </div>
            
            <button onClick={handleSaveInvoice} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition mb-8">
                {isEditMode ? 'Update Invoice' : 'Create Invoice'}
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">Add Entry:</h2>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                <input 
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket:</label>
                <input 
                    type="text"
                    value={entryTicket}
                    onChange={(e) => setEntryTicket(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>
                
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Haul From:</label>
                <select value={entryHaulFrom} onChange={(e) => setEntryHaulFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Select Haul From:</option>
                    {fromLocations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select> 
            </div>
                
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Haul To:</label>
                <select value={entryHaulTo} onChange={(e) => setEntryHaulTo(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Select Haul To:</option>
                    {toLocations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>
                
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight:</label>
                <input 
                    type="text"
                    value={entryWeight}
                    onChange={(e) => setEntryWeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>
                
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rate:</label>
                <input 
                    type="text"
                    value={entryRate}
                    onChange={(e) => setEntryRate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                /> 
            </div>
        </div>
                
            <button onClick={handleAddEntry} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition mb-8 w-full md:w-auto">Add Entry</button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">Invoice Entries</h2>
            <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ticket</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Haul From</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Haul To</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Weight</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rate/Tonne</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry) => (
                <tr key={entry._id}>
                    <td className="px-4 py-3 border-t border-gray-200 text-gray-700">{new Date(entry.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 border-t border-gray-200 text-gray-700">{entry.ticket}</td>
                    <td className="px-4 py-3 border-t border-gray-200 text-gray-700">{entry.haulFrom}</td>
                    <td className="px-4 py-3 border-t border-gray-200 text-gray-700">{entry.haulTo}</td>
                    <td className="px-4 py-3 border-t border-gray-200 text-gray-700">{entry.weight}</td>
                    <td className="px-4 py-3 border-t border-gray-200 text-gray-700">${entry.ratePerTonne}</td>
                    <td className="px-4 py-3 border-t border-gray-200 text-gray-700">${(entry.weight * entry.ratePerTonne).toFixed(2)}</td>
                    <td className="px-4 py-3 border-t border-gray-200 text-gray-700"><button onClick={() => handleDeleteEntry(entry._id)} className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded transition">Delete</button></td>
                </tr>
                ))}
            </tbody>
            </table>
            {entries.length > 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mt-6 max-w-md ml-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Invoice Totals</h3>
                <p className="flex justify-between text-gray-700 mb-2">Subtotal: ${entries.reduce((sum, entry) => sum + (entry.weight * entry.ratePerTonne), 0).toFixed(2)}</p>
                <p className="flex justify-between text-gray-700 mb-2">Less 7% Fee: ${(entries.reduce((sum, entry) => sum + (entry.weight * entry.ratePerTonne), 0) * 0.07).toFixed(2)}</p>
                <p className="flex justify-between text-gray-900 font-bold text-lg pt-4 border-t-2 border-gray-300"><strong>Total: ${(entries.reduce((sum, entry) => sum + (entry.weight * entry.ratePerTonne), 0) * 0.93).toFixed(2)}</strong></p>
                <button onClick={generatePDF} 
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Generate PDF
                </button>
            </div>
            )}
        </div>
    )
}

export default InvoiceForm;
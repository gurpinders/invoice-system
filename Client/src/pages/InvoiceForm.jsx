import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
              // fetch rate from API
              // set the rate
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
        <div>
            <button onClick={() => navigate("/")}> ← Back To Dashboard</button>
            <h1>{isEditMode ? "Edit Invoice" : "Create New Invoice"}</h1>
            
            <label>Invoice Number (Period):</label>
            <input 
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)} 
            />
            <p>Driver: B. Sandhu</p>
            <p>Truck: 127A</p>
            <button onClick={handleSaveInvoice}>
                {isEditMode ? 'Update Invoice' : 'Create Invoice'}
            </button>
            <h2>Add Entry:</h2>

            <label>Date:</label>
            <input 
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
            />

            <label>Ticket:</label>
            <input 
                type="text"
                value={entryTicket}
                onChange={(e) => setEntryTicket(e.target.value)}
            />

            <label>Haul From:</label>
            <select value={entryHaulFrom} onChange={(e) => setEntryHaulFrom(e.target.value)}>
                <option value="">Select Haul From:</option>
                {fromLocations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select> 

            <label>Haul To:</label>
            <select value={entryHaulTo} onChange={(e) => setEntryHaulTo(e.target.value)}>
                <option value="">Select Haul To:</option>
                {toLocations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <label>Weight:</label>
            <input 
                type="text"
                value={entryWeight}
                onChange={(e) => setEntryWeight(e.target.value)}
            />

            <label>Rate:</label>
            <input 
                type="text"
                value={entryRate}
                onChange={(e) => setEntryRate(e.target.value)}
            /> 
            <button onClick={handleAddEntry}>Add Entry</button>
            
            <h2>Invoice Entries</h2>
            <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Ticket</th>
                <th>Haul From</th>
                <th>Haul To</th>
                <th>Weight</th>
                <th>Rate/Tonne</th>
                <th>Amount</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry) => (
                <tr key={entry._id}>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td>{entry.ticket}</td>
                    <td>{entry.haulFrom}</td>
                    <td>{entry.haulTo}</td>
                    <td>{entry.weight}</td>
                    <td>${entry.ratePerTonne}</td>
                    <td>${(entry.weight * entry.ratePerTonne).toFixed(2)}</td>
                    <td><button onClick={() => handleDeleteEntry(entry._id)}>Delete</button></td>
                </tr>
                ))}
            </tbody>
            </table>
            {entries.length > 0 && (
            <div>
                <h3>Invoice Totals</h3>
                <p>Subtotal: ${entries.reduce((sum, entry) => sum + (entry.weight * entry.ratePerTonne), 0).toFixed(2)}</p>
                <p>Less 7% Fee: ${(entries.reduce((sum, entry) => sum + (entry.weight * entry.ratePerTonne), 0) * 0.07).toFixed(2)}</p>
                <p><strong>Total: ${(entries.reduce((sum, entry) => sum + (entry.weight * entry.ratePerTonne), 0) * 0.93).toFixed(2)}</strong></p>
            </div>
            )}
        </div>
    )
}

export default InvoiceForm;
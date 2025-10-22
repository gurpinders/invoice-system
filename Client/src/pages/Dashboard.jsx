import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetchInvoices();
    }, []);

    async function fetchInvoices(){
        try {
            const response = await axios.get('http://localhost:3001/api/invoices');
            setInvoices(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    if(loading){
        return (
            <div>Loading...</div>
        );
    }

    const handleCreateInvoice = () => {
        navigate("/invoice/new");
    }

    const handleInvoiceClick = (id) => {
        navigate(`/invoice/${id}`);
    }

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <button onClick={handleCreateInvoice} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mb-8">Create New Invoice</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {invoices.map((invoice) => (
                    <div 
                    key={invoice._id}
                    onClick={() => handleInvoiceClick(invoice._id)}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
                    >
                        <p className="text-lg font-semibold text-blue-600 mb-3">{invoice.invoiceNumber}</p>
                        <p className="text-2xl font-bold text-green-600">${invoice.total}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
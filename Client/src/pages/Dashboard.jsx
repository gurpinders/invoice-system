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
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleCreateInvoice}>Create New Invoice</button>
            
            {invoices.map((invoice) => (
                <div 
                key={invoice._id}
                onClick={() => handleInvoiceClick(invoice._id)}
                style={{ cursor:"pointer" }}
                >
                    <p>{invoice.invoiceNumber}</p>
                    <p>${invoice.total}</p>
                </div>
            ))}
        </div>
    )
}

export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [invoices, setInvoices] = useState([]);
    const [newInvoice, setNewInvoice] = useState({ invoiceNo: '', customer: '', email: '', invoiceDate: '', amount: '', status: '' });

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        const response = await axios.get('http://localhost:8080/invoices');
        setInvoices(response.data);
    };

    const addInvoice = async () => {
        const response = await axios.post('http://localhost:8080/invoices', newInvoice);
        setInvoices([...invoices, response.data]);
        setNewInvoice({ invoiceNo: '', customer: '', email: '', invoiceDate: '', amount: '', status: '' });
    };

    const updateInvoice = async (id, updatedInvoice) => {
        const response = await axios.put(`http://localhost:8080/invoices/${id}`, updatedInvoice);
        setInvoices(invoices.map(invoice => (invoice.id === id ? response.data : invoice)));
    };

    const deleteInvoice = async (id) => {
        await axios.delete(`http://localhost:8080/invoices/${id}`);
        setInvoices(invoices.filter(invoice => invoice.id !== id));
    };

    return (
        <div className="App">
            <h1>Invoice Management</h1>
            <div className="form">
                <input type="text" placeholder="Invoice No" value={newInvoice.invoiceNo} onChange={e => setNewInvoice({ ...newInvoice, invoiceNo: e.target.value })} />
                <input type="text" placeholder="Customer" value={newInvoice.customer} onChange={e => setNewInvoice({ ...newInvoice, customer: e.target.value })} />
                <input type="text" placeholder="Email" value={newInvoice.email} onChange={e => setNewInvoice({ ...newInvoice, email: e.target.value })} />
                <input type="date" placeholder="Invoice Date" value={newInvoice.invoiceDate} onChange={e => setNewInvoice({ ...newInvoice, invoiceDate: e.target.value })} />
                <input type="number" placeholder="Amount" value={newInvoice.amount} onChange={e => setNewInvoice({ ...newInvoice, amount: e.target.value })} />
                <input type="text" placeholder="Status" value={newInvoice.status} onChange={e => setNewInvoice({ ...newInvoice, status: e.target.value })} />
                <button onClick={addInvoice}>Add Invoice</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Invoice No</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Invoice Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.invoiceNo}</td>
                            <td>{invoice.customer}</td>
                            <td>{invoice.email}</td>
                            <td>{invoice.invoiceDate}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.status}</td>
                            <td>
                                <button onClick={() => updateInvoice(invoice.id, { ...invoice, status: 'Completed' })}>Mark as Completed</button>
                                <button onClick={() => deleteInvoice(invoice.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import InvoiceForm from "./pages/InvoiceForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/invoice/new" element={<InvoiceForm />}/>
        <Route path="/invoice/:id" element={<InvoiceForm />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

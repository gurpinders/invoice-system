import Invoice from "../models/Invoice.js";

async function getAllInvoices(req, res) {
  try {
    const invoices = await Invoice.find();
    const invoicesWithTotals = invoices.map((invoice) => {
      const subtotal = invoice.entries.reduce((sum, entry) => {
        sum += entry.weight * entry.ratePerTonne;
        return sum;
      }, 0);
      const feeCut = subtotal * 0.07;
      const total = subtotal - feeCut;
      return {
        _id: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        createdAt: invoice.createdAt,
        entries: invoice.entries,
        subtotal: subtotal,
        feeCut: feeCut,
        total: total,
      };
    });
    res.status(200).json(invoicesWithTotals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getInvoicesById(req, res) {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice Not Found " });
    }
    const subtotal = invoice.entries.reduce((sum,entry) => {
        sum += entry.weight * entry.ratePerTonne;
        return sum;
    }, 0);
    const feeCut = subtotal * 0.07;
    const total = subtotal - feeCut;
    res.status(200).json({
        _id: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        createdAt: invoice.createdAt,
        entries: invoice.entries,
        subtotal: subtotal,
        feeCut: feeCut,
        total: total,
    })
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export { getAllInvoices, getInvoicesById };

import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
    },
    entries: [
      {
        date: {
          type: Date,
          required: true,
        },
        ticket: {
          type: String,
          required: true,
        },
        haulFrom: {
          type: String,
          required: true,
        },
        haulTo: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
        ratePerTonne: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);

import mongoose from "mongoose";
import dotenv from "dotenv";
import Invoice from "./models/Invoice.js";
import Rate from "./models/Rate.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Sample rates data
const rates = [
    { haulFrom: "Dundas", haulTo: "Vickers", rate: 7.40 },
    { haulFrom: "Shelburne", haulTo: "Vickers", rate: 8.35 },
    { haulFrom: "Brechin", haulTo: "Downtown", rate: 11.50 },
    { haulFrom: "Central Sand", haulTo: "Downtown", rate: 6.85 },
    { haulFrom: "Miller Paving", haulTo: "Markham", rate: 9.75 }
];
  
// Sample invoice data
const invoice = {
    invoiceNumber: "1 October - 15 October",
    entries: [
        {
        date: new Date("2024-10-01"),
        ticket: "136358132",
        haulFrom: "Dundas",
        haulTo: "Vickers",
        weight: 42.67,
        ratePerTonne: 7.40
        },
        {
        date: new Date("2024-10-01"),
        ticket: "136358068",
        haulFrom: "Dundas",
        haulTo: "Vickers",
        weight: 42.98,
        ratePerTonne: 7.40
        },
        {
        date: new Date("2024-10-02"),
        ticket: "149785586",
        haulFrom: "Brechin",
        haulTo: "Downtown",
        weight: 43.07,
        ratePerTonne: 11.50
        }
    ]
};

const seedDatabase = async () => {
    try {
        // Clear existing data
        await Rate.deleteMany({});
        await Invoice.deleteMany({});
        console.log('Cleared existing data...');

        // Insert rates
        await Rate.insertMany(rates);
        console.log('Rates seeded successfully!');

        // Insert invoice
        await Invoice.create(invoice);
        console.log('Invoice seeded successfully!');

        // Close connection
        mongoose.connection.close();
        console.log('Database seeding complete!');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

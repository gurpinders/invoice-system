import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
    haulFrom: {
        type: String, 
        required: true
    },
    haulTo: {
        type: String,
        required: true
    }, 
    rate:{
        type: Number,
        required: true
    }
}, {timestamps: true});

export default mongoose.model("Rate", rateSchema);
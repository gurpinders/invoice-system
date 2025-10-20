import Rate from "../models/Rate.js";

async function getFromLocations(req, res){
    try {
        const fromLocations = await Rate.distinct("haulFrom");
        res.status(200).json(fromLocations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getToLocations(req, res){
    try {
        const toLocations = await Rate.distinct("haulTo");
        res.status(200).json(toLocations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getFromLocations, getToLocations };
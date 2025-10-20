import Rate from "../models/Rate.js";

async function getAllRates(req,res){
    try {
        const allRates = await Rate.find();
        res.status(200).json(allRates);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function getRateByLocation(req, res){
    try {
        const { haulFrom, haulTo } = req.query;
        const rate = await Rate.findOne({ haulFrom, haulTo });
        if(!rate){
            return res.status(404).json({message: "Rate Not Found!"});
        }
        res.status(200).json(rate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { getAllRates, getRateByLocation };
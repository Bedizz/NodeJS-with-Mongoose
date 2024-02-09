import  Country  from "../models/country.js";


 export const getCountries = async (req,res) => {
    try {
        const country = await Country.find().sort({name: 1}); // here we are sorting the countries by name in ascending order
        res.json(country)
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}



export const postCountry = async (req, res) => {
    try {
        const { name, alpha2Code, alpha3Code } = req.body;
        
        const data = await Country.create ({ name, alpha2Code, alpha3Code });
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });    
    }
}
export const getCountryByCode = async (req, res) => {
    const upperCaseCode = req.params.code.toUpperCase();

    try {
        const data = await Country.findOne({$or: [{alpha2Code: upperCaseCode}, {alpha3Code: upperCaseCode}]});
        if (!data) {
            res.status(404).json({message: 'Country not found'});
        }
        res.json(data);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const putCountryByCode = async (req, res) => {
    const upperCaseCode = req.params.code.toUpperCase();
    const updatedCountry = req.body;
    try {
        const data = await Country.findOneAndUpdate({$or: [{name: upperCaseCode}, {alpha2Code: upperCaseCode}, {alpha3Code: upperCaseCode}]}, updatedCountry, {new: true});
        if (!data) {
            res.status(404).json({message: 'Country not found'});
        }
        res.json(data);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }


}
export const deleteCountryByCode = async (req, res) => {
    const upperCaseCode = req.params.code.toUpperCase();
    try {
        const data = await Country.findOneAndDelete({$or: [{name: upperCaseCode}, {alpha2Code: upperCaseCode}, {alpha3Code: upperCaseCode}]});
        if (!data) {
            res.status(404).json({message: 'Country not found'});
        }
        res.json(data);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

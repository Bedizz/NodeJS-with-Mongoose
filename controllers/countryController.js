import  Country  from "../models/country.js";


 export const getCountries = async (req,res) => {
    try {
        // -----------------------------------------------
        // const data = await Country
        // .find(visited ? { visited } : {})
        // .sort(sort ? { name: 1 } : {});
    
        // data.length > 0
        //   ? res.json(data)
        //   : res.status(404).json({ message: "No countries found." });
        // -----------------------------------------------
         const { sort, visited } = req.query;
         let queryOptions = {};
         let sortOptions = {};

         if (visited) {
            if (visited === 'true') {
                queryOptions.visited = 'true';
            } else {
                queryOptions.visited = 'false';
            }
         }
         if (sort) {
            if (sort === 'true') {
                queryOptions.name = 1;
            } else {
                queryOptions.name = -1;
            }
         }
        const country = await Country.find(queryOptions).sort(sortOptions);
        // const country = await Country.find().sort({name: 1}); // here we are sorting the countries by name in ascending order
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
    res.json(req.country)
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

    // -----first part------------
    // try {
    //     const data = await Country.findOneAndDelete({$or: [{name: upperCaseCode}, {alpha2Code: upperCaseCode}, {alpha3Code: upperCaseCode}]});
    //     if (!data) {
    //         res.status(404).json({message: 'Country not found'});
    //     }
    //     res.json(data);
        
    // } catch (error) {
    //     res.status(500).json({message: error.message});
    // }
    //------ bonus part---------------
    try {
        const country = await Country.findOne({$or: [{ alpha2Code: upperCaseCode}, {alpha3Code: upperCaseCode}]})
        country.visited = !country.visited;
        await country.save();
        res.json({message: `Country ${country.visited ? 'marked as visited': 'marked as to visit'}.`, country: country});
    } catch (error) {
        res.status(500).json({message: error.message})
    
    }

}

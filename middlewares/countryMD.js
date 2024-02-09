
export const checkCountry = async (req, res, next) => {
    const {name} = req.body;
    try {
        const country = await CountryCluster.findOne({name});
        
        if(country){
            return res.status(400).json({message: "Country already exists"});
        }else {
            next();
        }
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


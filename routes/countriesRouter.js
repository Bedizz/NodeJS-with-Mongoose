import express from 'express';
import { getCountries,postCountry,getCountryByCode,putCountryByCode,deleteCountryByCode } from '../controllers/countryController.js';
import { checkCountry } from '../middlewares/countryMD.js';



const countriesRouter = express.Router();

countriesRouter.get('/', getCountries)
countriesRouter.post('/',checkCountry, postCountry)
countriesRouter.get('/:code',getCountryByCode)
countriesRouter.put('/:code',putCountryByCode)
countriesRouter.delete('/:code',deleteCountryByCode)



export default countriesRouter;
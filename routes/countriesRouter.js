import express from 'express';
import { getCountries,postCountry,getCountryByCode,putCountryByCode,deleteCountryByCode } from '../controllers/countryController.js';
import { checkCountry } from '../middlewares/countryMD.js';



const countriesRouter = express.Router();

countriesRouter.get('/countries', getCountries)
countriesRouter.post('/countries',checkCountry, postCountry)
countriesRouter.get('/countries/:code',getCountryByCode)
countriesRouter.put('/countries/:code',putCountryByCode)
countriesRouter.delete('/countries/:code',deleteCountryByCode)



export default countriesRouter;
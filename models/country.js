import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    alpha2Code: {
        type: String,
        required: true
            },
    alpha3Code: {
        type: String,
        required: true
                }
 });
const Country = mongoose.model('Country', countrySchema);

export default Country;

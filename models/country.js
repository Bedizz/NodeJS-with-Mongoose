import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    alpha2Code: {
        type: String,
        required: true,
        match: [/^[A-Z]{2}$/, 'Please fill a valid alpha2Code']
            },
    alpha3Code: {
        type: String,
        required: true,
        match: [/^[A-Z]{2}$/, 'Please fill a valid alpha2Code']
                },
    visited: {
        type: Boolean,
        default: false
    }
 });
const Country = mongoose.model('Country', countrySchema);

export default Country;

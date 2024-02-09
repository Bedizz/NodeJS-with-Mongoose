import 'dotenv/config'
import express from 'express';
import { connectDatabase } from './db/client.js';
import  countriesRouter  from './routes/countriesRouter.js';




const PORT = 3000 || process.env.PORT;
const app = express();

app.use(express.json());

app.use('/api',countriesRouter); // this is the middleware that will be used to route the request to the countriesRouter

const startServer = async () => {
    await connectDatabase();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer().catch(error => {console.log(error,'failed to start server')});



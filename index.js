
const express= require('express');
const app= express();
const connectDB = require('./connect');
const PORT=8001;
const urlRoutes= require('./routes/url');

app.use(express.json()); //important to parse the incoming request body as JSON
app.use('/',urlRoutes);

connectDB('mongodb://localhost:27017/urlshortnerdb').then(()=>{
    console.log('Connected to MongoDB');
});
        


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


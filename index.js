
const express= require('express');
const app= express();
exports.app = app;
const connectDB = require('./connect');
const PORT=8001;
const staticRoutes= require('./routes/staticrouter');

//for EJS 
const path = require('path'); //module
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use('/home', staticRoutes);



const urlRoutes= require('./routes/url');

app.use(express.json()); //important to parse the incoming request body as JSON
app.use(express.urlencoded({ extended: true }));






app.use('/',urlRoutes);

connectDB('mongodb://localhost:27017/urlshortnerdb').then(()=>{
  console.log('Connected to MongoDB');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


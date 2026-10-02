
const express= require('express');
const cookieParser = require('cookie-parser');
const app= express();
exports.app = app;
const connectDB = require('./connect');
const PORT=8001;
const staticRoutes= require('./routes/staticrouter');
const userRoutes = require('./routes/user');
const authMiddleware = require('./middlewares/auth');

//for EJS 
const path = require('path'); //module
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/home', authMiddleware, staticRoutes);
app.use('/user', userRoutes);



const urlRoutes= require('./routes/url');

app.use('/',urlRoutes);

connectDB('mongodb://localhost:27017/urlshortnerdb').then(()=>{
  console.log('Connected to MongoDB');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/auth');
const matchesRoute = require('./routes/match');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(authRoute);
app.use(matchesRoute);

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname,'client/build')));  // location of build folder

    app.get('*',(req,res,next)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html')); // location of index.html file
    })
}


mongoose.connect('mongodb+srv://prakhar:admin@cluster0-qejpw.mongodb.net/ipl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    });
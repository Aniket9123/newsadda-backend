const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const dotenv = require('dotenv')

dotenv.config()

const app = express();
// it will convert the data to json format
app.use(express.json())

app.use(cors())

const url = process.env.MONGO_URI;

mongoose.connect(url).then(()=>{
    console.log("Database Connected Successfully")
})

app.post('/register',(req,res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/login',(req,res) => {
    console.log(req);
    const {email,password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user)
        {
            if(user.password === password)
            {
                res.json("Success")
            }
            else{
                res.json("the password is incorrect")
            }
        }
        else
        {
            res.json("No record was existed")
        }
    })
})

app.listen(3001, ()=>{
    console.log("server is running very smooth");
});
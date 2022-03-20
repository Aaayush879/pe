const express = require('express');
const mongoose= require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');

const port = process.env.PORT||2000;
const Login = require('./model/Register');
const cors = require('cors');
const URL='mongodb+srv://ayushh:ayushhh@cluster0.yqrvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.use(bodyparser.json());
app.use(express.json());

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(()=>{
    console.log(`sucessfully connected dp`);
}).catch((e)=>{
    console.log(e);
    
})
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello");
});


app.post('/items' , async(req,res)=>{
    const register= await new Login(req.body);
    
    console.log(register);
    const insertR = await register.save();
    console.log(insertR);
    res.send(insertR);
        
   
    
});
app.post("/signin",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await Login.findOne({email:email});
        if(user.password==password){
            res.send(`welcome ${user.namee}`);
            console.log(`welcome ${user.namee}`);
        }
        else{
            res.send('wrong password');
            console.log('wrong password');
        }

    }
    catch(e){
        res.send('user not found');
        console.log('user not found')
    }
    
})   
 app.get('/items',(req,res,next)=>{
     Login.find({})
     .then(data => res.json(data))
     .catch(next)

}); 

    





app.listen(port,(req,res)=>{
    console.log(`connected at ${port}`);
    
})
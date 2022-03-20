const port = process.env.PORT||2000;
const cors = require('cors');
const URL='mongodb+srv://ayushh:ayushhh@cluster0.yqrvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))
app.get("/",(req,res)=>{
    return res.redirect('p1.html');
})
app.post("/items",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
        console.log(data);
    });

    return res.redirect('sucess.html')

})
app.post("/signin",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await db.collection('users').findOne({email:email});
        if(user.password==password){
            res.send(`welcome ${user.name}`);
            console.log(`welcome ${user.name}`);
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


    





app.listen(port,(req,res)=>{
    console.log(`connected at ${port}`);
    
})
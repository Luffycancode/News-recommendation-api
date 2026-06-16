const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config(); 
const JWTSecretkey=process.env.JWTSecretkey;
const JWTExpirationTime=process.env.JWTExpirationTime;
const User = require('../models/User');


async function userSignup(req,res)
{

try
{
    const {name,password,email,preferences}=req.body
    if(!name || !password || !email)
        {
            return res.status(400).json({ 
            message: "Missing fields. Name, password, and email are required."})
        }

    const emailcheck= await User.findOne({email})
        if(emailcheck)
        {
            return res.status(400).json({ 
            message: "An account with this email already exists."})
        }

    const hashpassword= await bcrypt.hash(password, 10)

    const newuser=
    {
        name:name,
        password:hashpassword,
        email:email,
        preferences:preferences
    }

    await User.create(newuser);


    return res.status(200).json({
    message: "Registration successful!",
    user: { name, email, preferences } })

}catch(error)
    {
        return res.status(500).json({
        message: "Internal server error"});
    }    



}



async function userLogin(req,res)
{
try
{
    const {password,email}=req.body
    const Credentialscheck= await User.findOne({email})
    if(!Credentialscheck)
    {
        return res.status(401).json({
        message:"Invalid credentials"
        })
    }

    const passworddecrypt= await bcrypt.compare(password,Credentialscheck.password); 
    if(!passworddecrypt)
    {
        return res.status(401).json({
        message:"Invalid credentials"
        })     
    }


    const payload={
        userid : Credentialscheck.name,
        email: Credentialscheck.email
    }

//Creatiion of JWT Token
    const token= jwt.sign(payload,JWTSecretkey,{expiresIn: JWTExpirationTime})
    return res.status(200).json({
    token
})


}catch(error)
    {
        return res.status(500).json({
        message: "Internal server error"});
    }
}



async function getuserpreferences(req,res) {



    // const user= await User.findOne()

    const user= await User.findOne({
        email: req.user.email
    })
    
    return res.status(200).json({
        preferences:user.preferences

    })

}




async function userpreferencesupdate(req, res) {

    const data=req.body
    const payload=data.preferences


    const user= await User.findOne({
        email: req.user.email
    })
    user.preferences=payload
    await user.save();
    res.status(200).json({
        message: 'Preferences updated'
    });
};



async function getNews(req,res){
    try
    { 
        const user= await User.findOne({
            email: req.user.email
        })
        const query= user.preferences.join(" OR ")

        const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${query}&apikey=${process.env.NEWS_API_KEY}` );

        return res.status(200).json({
            news: response.data.articles
        });

    }
    catch(error)
    {
        console.log(error.message);

        return res.status(500).json
        ({
        message: "Error fetching news"
        })

}
}



module.exports={ userSignup, userLogin, getuserpreferences,userpreferencesupdate,getNews}

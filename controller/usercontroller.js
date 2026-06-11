const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users=require('../models/usermodel')
// const JWTsecretkey= 'Hello12345'
require('dotenv').config(); 
const JWTSecretkey=process.env.JWTSecretkey;
const JWTExpirationTime=process.env.JWTExpirationTime;


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
    const emailcheck= users.find(user=> user.email===email)
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

    users.push(newuser)


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
    const Credentialscheck= users.find(user=> user.email===email)
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

    const user= users.find(user=>user.preferences)
    
    return res.status(200).json({
        preferences:user.preferences

    })



}

async function userpreferencesupdate(req, res) {

    const data=req.body
    const payload=data.preferences


    const user= users.find(user=>user.preferences)
    user.preferences=payload

    res.status(200).json({
        message: 'Preferences updated'
    });
};

async function getNews(req,res) {
    
        return res.status(200).json({
            news: ['']
        })
}

module.exports={ userSignup, userLogin, getuserpreferences,userpreferencesupdate,getNews}

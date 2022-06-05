
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
// const registration= require('../Model/programs');
const UserService = require('../Services/users');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users/', async (req, res) => {
    try {
     const data  = req.body;
     const { email, undergradFName, undergradLName,faculty, batch, undergradPassword,phone_number} = data;
   if(!data) {
       return "Please pass all required fields!"
    }
  
    const dataToSaveUser = {email,phone_number};
    const dataToSaveUnderg = {email,undergradFName, undergradLName,faculty, batch, undergradPassword};

    let createUser=  await UserService.createUser(dataToSaveUser);
    let createUnderg=  await UserService.createUndergraduate(dataToSaveUnderg);
   
     if (createUser) {
       return res.status(200).send(
        createUser
      )
     }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  });

  module.exports.handler = serverless(app);
const { Router } = require('express');
const router = Router()
const { config } = require('dotenv')
config()

var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.EMAIL_API_KEY;


router.post('/sendEmail', async(req, res) => {

    const {email, password} = req.body;

    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

     "sender":{ "email":"deadourfreedom@gmail.com", "name":"SPORTELIA"},
     "subject":"Vous avez été ajouté à l'application Sportelia",
     "templateId":3,
     "params":{
        "greeting":"This is the default greeting",
        "headline":"This is the default headline"
     },
     "messageVersions":[
       //Definition for Message Version 1 
       {
           "to":[
              {
                 "email":`${email}`,
              },
              
           ],
           "params":{
              "email":`${email}`,
              "password":`${password}`
           },
           "subject":"Vous avez été ajouté à l'application Sportelia"
        },

    ]

}).then(function(data) {
  console.log(data);
}, function(error) {
  console.error(error);
});
})

router.post('/sendEmail/update', async(req, res) => {

    const {email} = req.body;

    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

     "sender":{ "email":"deadourfreedom@gmail.com", "name":"SPORTELIA"},
     "subject":"Vos droits/informations ont été modifiés.",
     "templateId":4,
     "params":{
        "greeting":"This is the default greeting",
        "headline":"This is the default headline"
     },
     "messageVersions":[
       //Definition for Message Version 1 
       {
           "to":[
              {
                 "email":`${email}`,
              },
              
           ],
           "subject":"Vos droits/informations ont été modifiés."
        },

    ]

}).then(function(data) {
  console.log(data);
}, function(error) {
  console.error(error);
});
})


module.exports = router;
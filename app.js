const express = require('express');
const bodyparser = require('body-parser');
const pug = require('pug');
const path = require('path');

const _ = require('lodash');

const {Donor} = require('./models/customer');
const {initializepayment,verifypayment} = require('./config/paystack');
const port = 3000;
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public/')));
app.set('view engine', pug);

app.get('/',(req,res)=>{
    res.render(index.pug);
});

app.post('/paystack/pay',(req,res)=>{
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *=100;
    initializepayment(form,(error,body)=>{
        if(error){
            console.log(error);
            return res.redirect('/error')
            return;
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    });
});

app.get('/paystack/callback',(req,res)=>{
    const ref = req.query.reference;
    verifypayment(ref,(error,body)=>{
        if(error){
            console.log(error);
            res.redirect('/errror');
        }
        response = JSON.parse(body);
        const data = _.at(response.data,['reference','amount','customer.email','metadata.full_name']);
        ['reference','amount','email','full_name'] = data;
        newDonor = {reference,amount,email,full_name};
        const donor = new Donor(newDonor)
        donor.save().then(donor)
    })
})


app.listen(port,()=>{
    console.log('App is listening on port 3000');
})

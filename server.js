const express = require('express');
const hbs = require('hbs');
const fs= require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err)
    console.log('cannot connect to server');
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    titlePage: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    titlePage: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Some error occured'
  });
});

app.listen(3000,()=>{
  console.log("Connected to 3000 port");
});

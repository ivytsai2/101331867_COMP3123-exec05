const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
const user = require('./user.json')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  //res.send('This is home router');
  res.sendFile(path.join(__dirname + '/home.html'))
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  //res.send('This is profile router');
  res.send(user)
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  //res.send('This is login router');
  const username = req.query.username
  const password = req.query.password
  if (username == user.username && password == user.password){
    res.send({
      status: true,
      message: "User Is valid"
    })
  } else if (username != user.username) {
    res.send({
      status: false,
      message: "User Name Is invalid"
    })
  } else {
    res.send({
      status: false,
      message: "Password Is invalid"
    })
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  //res.send('This is logout router');
  const username = req.params.username
  if (username == user.username) {
    res.send(`<b>${username} successfully logout.<b>`)
  }
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));
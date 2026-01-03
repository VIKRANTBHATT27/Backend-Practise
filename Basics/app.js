// creating a files which contains the ip address and route that visit our webpage
const express = require("express");
const app = express();
const port = 8080;


app.get('/', (req, res) => {
     res.send('welcome to home page');
});


          {/* GET REQUESTS */}
app.get('/about', (req, res) => {
     res.send('This is our companies about section');
});
app.get('/contacts', (req, res) => {
     res.send('you will find contacts in phone');
});
app.get('/search', (req, res) => {
     res.send(`Your youtube search is related to ${req.query.search_query}`);
})
app.get('/signup', (req, res) => {
     res.send("this is a signup root, post request are allowed!");
});


          {/* POST REQUESTS */}
app.post('/signup', (req, res) => {
     //DB QUERY
     res.end('Your form is been submitted successfully!');          
});



app.listen(port, () => {
     console.log(`backend is working!!`);
});
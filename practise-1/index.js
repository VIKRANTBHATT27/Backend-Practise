const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

const allUsers = require('./MOCK_DATA.json');


// middleware - to handle urlencoded data (without this req.body = undefined)
app.use(express.urlencoded({ extended: false }));

// CUSTOMIZATION MIDDLEWARE
app.use((req, res, next) => {
     console.log('created logs');
     
     const DateandTime = new Date().toLocaleString();
     const msg = (
          `${req.method} request: ${req.url}\nTime: ${DateandTime}\nIP Address: ${req.ip}\nId: ${req.query.userId || "unknown"}\n\n`
     );
     fs.appendFile('./logs.txt', msg, (err, data) => {
          next();
     });
});

app.use((req, res, next) => {
     if (true) return res.end('done with MIDDLEWARES');
})


//Routes
app.get('/users', (req, res) => {
     const html = `
     <ul>
     ${ allUsers.map((user) => `<li>${user.first_name}</li>`).join('') }
     </ul>
     `;
     
     res.send(html);
});

//RESTAPI
app.get('/api/users', (req, res) => {
     return res.json(allUsers);
});

app.route('/api/users/:id')
     .get((req, res) => {
          const Id = Number(req.params.id);
          const user = allUsers.filter((obj) => obj.id === Id);
          
          return res.json(user);
     })
     .patch((req, res) => {
          const Id = Number(req.params.id);
          const index = allUsers.findIndex((obj) => obj.id === Id);
          
          allUsers[index] = { ...allUsers[index], ...req.body};

          fs.writeFile('./MOCK_DATA.json', JSON.stringify(allUsers), (err, data) => {
               return res.json({ status: "sucessfully modified the user", id: Id });
          });
     })
     .delete((req, res) => {
          const Id = Number(req.params.id);
          
          const index = allUsers.findIndex((obj) => obj.id === Id);
          console.log(index);


          allUsers.splice(index, 1);
          fs.writeFile('./MOCK_DATA.json', JSON.stringify(allUsers), (err, data) => {
               return res.json({ status: "sucessfully deleted the user" });
          })
     })



app.post('/api/users', (req, res) => {
     const user = req.body;
     console.log(user);
     
     allUsers.push({ id: allUsers.length+1 , ...req.body });        //it adds into the object i.e allUser but won't write it into file
     fs.writeFile('./MOCK_DATA.json', JSON.stringify(allUsers), (err, data) => {
          return res.json({ status: "sucessfully created a new user", id: allUsers.length });
     });
     
     // fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(allUsers));
     // return res.json({ status: "sucessfully created a new user", id: allUsers.length });
})
//add user data in json form POST REQUEST FOLLOW UP



app.listen(PORT, () => console.log(`Backend is live on port ${PORT}`));
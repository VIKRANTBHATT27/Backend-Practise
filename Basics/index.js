// creating a files which contains the ip address and route that visit our webpage
const fs = require("fs");
const http = require("http");
const url = require("url");

function bestServerFunction(req, res) {
     console.log('working ...');
     
     const myUrl = url.parse(req.url, true);
     if (myUrl.pathname !== '/favicon.ico') {
          const DateandTime = new Date().toLocaleString();
          
          console.log(myUrl);
          const msg = (
               `${req.method} request: ${myUrl.pathname}\nTime: ${DateandTime}\nBy: ${myUrl.query.userName || "anonymous"}\nId: ${myUrl.query.userId || "unknown"}\n\n`
          );
          
          fs.appendFile('logs.txt', msg, (err, data) => {
               console.log(`a request is made at ${DateandTime}`);
          });
     }

     switch(myUrl.pathname) {
          case '/':
               res.end('welcome to home page');
               break;

          case '/about':
               res.end('Thank you for visiting our about section')
               break;
          
          case '/contacts':
               res.end('you will find contacts below');
               break;

          case '/search':
               const searchStuff = myUrl.query.search_query;
               res.end(`Your search is related to ${searchStuff}`);
               break;
               
          case '/signup':
               if (req.method === 'GET') res.end("this is a signup root, post request are allowed!");
               else if (req.method === 'POST') {
                    //DB QUERY
                    res.end('Your form is been submitted successfully!');
               }
               break;

          default:
               res.end('404 error nothing exist here');
               break;
     }
     
}

const myServer = http.createServer(bestServerFunction);


myServer.listen(8080, () => { console.log('server is live on port 8080') });     
//the second parameter is optional
const { getUser } = require("../service/auth");

const checkforAuthentication = (req, res, next) => {
     const tokenCookie = req.cookies?.token;
     req.user = null;

     if (!tokenCookie) return next();

     const user = getUser(tokenCookie);
     req.user = user;

     return next(); 
}

const checkforAuthorization = (roles = []) => {        //given default values here
     return (req, res, next) => {
          if (!req.user) return res.redirect('/login');

          if (!roles.includes(req.user.role)) return res.end("Un-Authorized Request");
          
          return next();
     }
}

module.exports = {
     checkforAuthentication,
     checkforAuthorization
};
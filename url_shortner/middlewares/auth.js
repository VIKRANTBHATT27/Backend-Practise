const { getUser } = require("../service/auth");

const restrictToLoggedInUsersOnly = async (req, res, next) => {
     const userUid = req.cookies?.uid || null;
     if (!userUid) return res.redirect('/login');
     
     const user = getUser(userUid);
     if(!user) return res.redirect('/login');

     req.user = user;

     console.log(req.user);
     
     next();
};

module.exports = {
     restrictToLoggedInUsersOnly,
};
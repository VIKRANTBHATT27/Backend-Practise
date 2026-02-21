import TokenUtils from "../services/authentication.js";
const { verifyToken } = TokenUtils;

const checkForAuthenticationCookie = (cookieName) => {
     return (req, res, next) => {
          
          const token = req.cookies[cookieName];
          if (!token) return next();
          
          try {
               const userPayload = verifyToken(token);
               req.user = userPayload;
          } catch (error) {
               console.log("Invalid token: ", error.message);
               res.clearCookie(cookieName);
          }

          next();
     };
};

export default checkForAuthenticationCookie;
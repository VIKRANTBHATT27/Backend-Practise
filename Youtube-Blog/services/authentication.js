import JWT from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const secretKey = process.env.AUTH_SECRET;

const createToken = (user) => {
     const payload = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profileImgUrl: user.profileImgUrl,
          role: user.role
     };

     const token = JWT.sign(payload, secretKey, { expiresIn: "12hrs" });
     return token;
};

const verifyToken = (token) => {
     const payload = JWT.verify(token, secretKey);
     return payload;
}

export default {
     createToken,
     verifyToken
}
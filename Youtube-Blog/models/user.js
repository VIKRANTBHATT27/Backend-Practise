const { createHmac, randomBytes } = await import("crypto");
import { Schema, model } from "mongoose";
import { type } from "os";

const userSchema = new Schema({
     fullName: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     salt: {
          type: String,
     },
     password: {
          type: String,
          required: true
     },
     profileImgUrl: {
          type: String,
          default: '/images/user-profile-avatar-default.png'
     },
     public_id: {
          type: String,
          default: null
     },
     role: {
          type: String,
          enum: ['USER', 'ADMIN'],
          default: "USER"
     }

}, { collection: 'userModel', timestamps: true });


userSchema.pre('save', function () {
     const user = this;

     if (!user.isModified("password")) return;

     const secretSalt = randomBytes(16).toString();
     const hashedPassword = createHmac('sha256', secretSalt)
          .update(user.password)
          .digest('hex');

     this.salt = secretSalt;
     this.password = hashedPassword;
});

userSchema.static("matchPassword", async function (email, password) {
     const user = await this.findOne({ email });
     if (!user) throw new Error('User not found!');

     const salt = user.salt;
     const hashedPassword = user.password;

     const userProvidedHash = createHmac('sha256', salt)
          .update(password)
          .digest("hex");
     
     if (userProvidedHash !== hashedPassword) throw new Error('Incorrect Password!');

     return {...user?._doc, password: undefined, salt: undefined };
})

const userModel = new model("user", userSchema);
export default userModel;
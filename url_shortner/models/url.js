/* 
     for schema formation
     PARTS
     1. shortId
     2. redirectedId
     3. time => history
*/

const mongoose = require('mongoose');

const urlSchema = mongoose.Schema(
     {
          shortId: {
               type: String,
               required: true,
               unique: true
          },
          redirectingUrl: {
               type: String,
               required: true,
               unique: true
          },
          visitHistory: [ { timestamps: String } ],
          createdBy: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "userModel",
          }
     },
     { 
          timestamps: true,
          collection: 'urlModel'
     }
);

const urlModel = mongoose.model('url', urlSchema);
module.exports = urlModel;
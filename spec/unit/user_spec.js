const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/users";
const sequelize = require("../../src/db/models/index").sequelize;
const ShopList = require("../../src/db/models").ShopList;
const User =require("../../src/db/models").User;


  describe("POST /users", () => {
   it("should create a new user with valid values and redirect", (done) => {
     const options = {
       url: base,
       form: {
         email: "user@example.com",
         password: "123456789"
       }
     }

     request.post(options,
       (err, res, body) => {

         User.findOne({where: {email: "user@example.com"}})
         .then((user) => {
           expect(user).not.toBeNull();
           expect(user.email).toBe("user@example.com");
          
           done();
         })
         .catch((err) => {
           console.log(err);
           done();
         });
       }
     );
   });

// #3
   it("should not create a new user with invalid attributes and redirect", (done) => {
     request.post(
       {
         url: base,
         form: {
           email: "no",
           password: "123456789"
         }
       },
       (err, res, body) => {
         User.findOne({where: {email: "no"}})
         .then((user) => {
           expect(user).toBeNull();
           done();
         })
         .catch((err) => {
           console.log(err);
           done();
         });
       }
     );
   });

});

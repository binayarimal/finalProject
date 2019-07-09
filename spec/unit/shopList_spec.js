const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/users";
const sequelize = require("../../src/db/models/index").sequelize;
const ShopList = require("../../src/db/models").ShopList;
const User =require("../../src/db/models").User;
const Item =require("../../src/db/models").Item;


  describe("List", () => {
    beforeEach((done) => {
       this.shopList;
       this.item;
       this.user;

       sequelize.sync({force: true}).then((res) => {

  // #2
         User.create({
           email: "starman@tesla.com",
           password: "Trekkie4lyfe"
         })
         .then((user) => {
           this.user = user;
           ShopList.create({
             name: "something",
             description: "thatthing",
             userId:this.user.id,

  // #4
             items: [{
               title: "my first item",
             }]
           }, {

             include: {
               model: Item,
               as: "items"
             }
           })
           .then((sl) => {
             this.shopList = sl; //store the topic
             this.item = sl.items[0]; //store the post
             done();
           })
         })
       });
     });
     describe("#create()", () => {
        it("should create a shopList", (done) => {
         expect(this.shopList.name).toBe("something");
         expect(this.shopList.description).toBe("thatthing");
         done();
       })


     });
     describe("#getPost()", () => {

  it("should associate a shoplist and an item together", (done) => {


        this.shopList.getItems()
        .then((associatedPosts) => {
          expect(associatedPosts[0].title).toBe("my first item"
        );

      done();

    });
  });

});
     describe("#setUser()", () => {

 it("should associate a shopList and a user together", (done) => {

   User.create({
     email: "ada@example.com",
     password: "password"
   })
   .then((newUser) => {

     expect(this.shopList.userId).toBe(this.user.id);

     this.shopList.setUser(newUser)
     .then((shopList) => {

       expect(this.shopList.userId).toBe(newUser.id);
       done();

     });
   })
 });

});
     describe("#getUser()", () => {

it("should return the associated topic", (done) => {

this.shopList.getUser()
.then((associatedUser) => {
  expect(associatedUser.email).toBe("starman@tesla.com");
  done();
});

});

});



});

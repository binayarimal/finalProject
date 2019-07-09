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
        it("should create an item", (done) => {
         expect(this.item.title).toBe("my first item");
         expect(this.item).not.toBeNull();
         done();
       })


     });
      



});

const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/shopList";
const sequelize = require("../../src/db/models/index").sequelize;
const ShopList = require("../../src/db/models").ShopList;
const User =require("../../src/db/models").User;



describe("routes : posts", () => {
  beforeEach((done) => {
    this.shoplist;
    this.user;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;

        ShopList.create({
          name: "Winter Games",
          description: "Post your Winter Games stories.",
          userId:user.id

        })
        .then((shopList) => {
          this.shoplist = shopList;
          done();
        })
      })
    });
  });




  describe("User performing CRUD actions for Post", () => {
  beforeEach((done) => {
      User.create({
        email: "admin@example.com",
        password: "123456",

      })
      .then((user) => {
        request.get({         // mock authentication
          url: `http://localhost:5000/auth/fake?userId=${user.id}&email=${user.email}`
        },
        (err, res, body) => {
          done();
        }
      );
    });
  });

  describe("POST /shopList/create", () => {

    it("should create a new shopList and redirect", (done) => {

       const options={
         url: `${base}/create`,
         form:{
           name:"cars",
           description:"ferrari"
         }
            }


      request.post( options,
        (err, res, body) => {

          ShopList.findOne({where: {name: "cars"}})
          .then((sl) => {
            expect(sl).not.toBeNull();
            expect(sl.name).toBe("cars");
            expect(sl.description).toBe("ferrari");

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
  describe("POST /shopList/:shopListId/delete", () =>{
  it("should delete the topic with the associated ID", (done) => {

    ShopList.all()
    .then((sl) => {

      const countBeforeDelete = sl.length;
      request.post(`${base}/${this.shoplist.id}/delete`, (err, res, body) => {
        ShopList.all()
        .then((sl) => {
          expect(err).toBeNull();
          expect(sl.length).toBe(countBeforeDelete - 1);
          done();
        })

      });
    });

  });
})
describe("POST /topics/:id/update", () => {

 it("should update the topic with the given values", (done) => {
    const options = {
       url: `${base}/${this.shoplist.id}/update`,
       form: {
         name: "Trucks",
         description: "There are a lot of them"
       }
     };
//#1
     request.post(options,
       (err, res, body) => {

       expect(err).toBeNull();
//#2
       ShopList.findOne({
         where: { id: this.shoplist.id }
       })
       .then((sl) => {
         expect(sl.name).toBe("Trucks");
         done();
       });
     });
 });

});

    })

  })

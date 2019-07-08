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
  beforeAll((done) => {
      User.create({
        email: "admin@example.com",
        password: "123456",

      })
      .then((user) => {
        request.get({         // mock authentication
          url: `http://localhost:5000/auth/fake?userId=${user.id}&email=${user.email}`

        },
        (err, res, body) => {
          console.log("err",err);
          console.log("res",res.status)
          done();
        }
      );
    });
  });

  describe("POST /topics/:topicId/posts/create", () => {

    it("should create a new post and redirect", (done) => {




      request.post( { url: `${base}/create?name=${"cars"}&description=${"ferrari"}`
    },
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




    })

  })

module.exports = {
  init(app){
    const shopListRoutes = require("../routes/shopList");
    const itemsRoutes = require("../routes/items");
    const userRoutes = require("../routes/users");
    const collabsRoutes = require("../routes/collabs");
    if(process.env.NODE_ENV === "test") {
      console.log(process.env.NODE_ENV);
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    };
    app.use(shopListRoutes);
    app.use(itemsRoutes);
    app.use(userRoutes);
    app.use(collabsRoutes);



  }
}

module.exports = {
  init(app){
    const shopListRoutes = require("../routes/shopList");
    const userRoutes = require("../routes/users");
    const collabsRoutes = require("../routes/collabs");

    app.use(shopListRoutes);
    app.use(userRoutes);
    app.use(collabsRoutes);



  }
}

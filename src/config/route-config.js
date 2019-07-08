module.exports = {
  init(app){
    const shopListRoutes = require("../routes/shopList");
    const itemsRoutes = require("../routes/items");
    const userRoutes = require("../routes/users");
    const collabsRoutes = require("../routes/collabs");
  
    app.use(shopListRoutes);
    app.use(itemsRoutes);
    app.use(userRoutes);
    app.use(collabsRoutes);



  }
}

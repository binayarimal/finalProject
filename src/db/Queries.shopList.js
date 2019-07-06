
const ShopList = require("./models").ShopList;
const Collab = require("./models").Collab;
module.exports = {

  getAllShopLists(userId, callback){
    return ShopList.findAll(
      {
        include: [{
          model: Collab,
          as: "collabs",
          required: false,
          where:{userId:userId}
        }]
      }
    )
    .then((shopLists)=>{
      const filtered =    shopLists.filter(function(list){
        return list.userId == userId || list.collabs.length > 0
      });
      callback(null, filtered)
    })
    .catch((err) => {
      callback(err);

    })
  },
  getShopList(id, callback){

    return ShopList.findById(id)
    .then((shopList) => {
      callback(null, shopList);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addShopList(newShopList, callback){
    return ShopList.create({
      name: newShopList.name,
      description: newShopList.description,
      userId:newShopList.userId
    })
    .then((shopList) => {
      callback(null, shopList);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteShopList(id, callback){

    return ShopList.findById(id)
    .then((shopList) => {
      shopList.destroy()
      .then((res) => {
        callback(null, shopList);
      });
    })
    .catch((err) => {
      callback(err);
    });
  },
  updateShopList(req, updatedShopList, callback){
    return ShopList.findById(req.params.id,updatedShopList)
    .then((shopList) => {

      if(!shopList){
        return callback("ShopList not found");
      }

      shopList.update(updatedShopList, {
        fields: Object.keys(updatedShopList)
      })
      .then(() => {
        callback(null, shopList);
      })
      .catch((err) => {
        callback(err);
      })
    })
  }
}

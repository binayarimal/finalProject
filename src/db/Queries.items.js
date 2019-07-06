const Item = require("./models").Item;
module.exports = {
  getAllitems(id,callback){
    return Item.all({where:{shopListId:id}})
    .then((items) => {
      callback(null, items);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getItem(id, callback){

    return Item.findById(id)
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addItem(newItem, callback){
    return Item.create(newItem)
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteItem(req, callback){

    return Item.findById(req.params.id)
    .then((item) => {
      item.destroy()
      .then((res) => {
        callback(null, item);
      });
    })
    .catch((err) => {
      callback(err);
    });
  },
  mark(itemId, callback){
    Item.update(
      { status:"purchased" },
      { where: {id : itemId}
    }).then( () => {callback(null)})
    .catch(err=> callback(err))
  },
  unMark(itemId, callback){
    Item.update(
      { status:"added" },
      { where: {id : itemId}
    }).then( () => {callback(null)})
    .catch(err=> callback(err))
  },

}

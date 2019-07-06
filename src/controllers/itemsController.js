const itemQueries = require("../db/Queries.items.js");
module.exports = {
  show (id){
    itemQueries.getAllitems(req.params.id, (err, items)=>{
      if(err){
        res.send(err);
      } else {
        res.json(items);
      }
    })
  },
  create(req, res, next){
    let newItem = {
      title: req.body.item,
      shopListId:req.body.shopListId
    };
    itemQueries.addItem(newItem, (err, item) => {
      if(err){
        res.send(err);
        console.log(err)
      } else {
        res.send("success");
      }
    })
  },

  destroy(req, res, next){
    itemQueries.deleteItem(req, (err, item) => {
      if(err){
        res.send(err)
      } else {
        res.send("/items")
      }
    })
  },

    update(req, res, next){

      itemQueries.updateItem(req, req.body, (err, item) => {
        if(err || item == null){
          res.redirect(401, `/items/${req.params.id}/edit`);
        } else {
          res.redirect(`/items/${req.params.id}`);
        }
      });
    },
    mark(req, res, next){
    itemQueries.mark(req.body.itemId, (err) => {
      if (err){
         res.send(err);
      }
      else {
        res.send("success");
      }
    })
  },
  unMark(req, res, next){
  itemQueries.unMark(req.body.itemId, (err) => {
    if (err){
      res.send(err)
    }
    else {
      res.send("success");
    }
  })
}


  }

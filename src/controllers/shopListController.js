
const shopListQueries = require("../db/Queries.shopList.js");
const authoroties = require("../authoroties.js")
module.exports = {
  show (req, res, next){
  
    const authorized = new authoroties(req.user). _isLoggedIn();
    if(authorized){
    shopListQueries.getAllShopLists(req.user.id, (err, shopLists)=>{
      if(err){
        res.send(err);
        console.log(err)
      } else {
        res.json(shopLists);

      }
    })
  } else {
    res.sendStatus(200);
  }
  },
  create(req, res, next){

    const authorized = new authoroties(req.user). _isLoggedIn();
    if(authorized){
      let newShopList = {
        name: req.body.name,
        description:req.body.description,
        userId: req.user.id
      };
      shopListQueries.addShopList(newShopList, (err, shopList) => {
        if(err){
          res.send(err);
          console.log(err);
          console.log(req.user)
        } else {
          res.sendStatus(200);
        }
      })
    } else {
      res.send("You are not authorized to do that");

    }
  },

  destroy(req, res, next){
    const authorized = new authoroties(req.user). _isLoggedIn();
    if(authorized){
      shopListQueries.deleteShopList(req.params.id, (err, shopList) => {
        if(err){
          res.json(err);
        } else {
          res.json("success")
        }
      })
    } else {
      res.send("You are not authorized to do that");
      console.log(req.user)
    }
  },

  update(req, res, next){
    const authorized = new authoroties(req.user). _isLoggedIn();
    if(authorized){
      shopListQueries.updateShopList(req, req.body, (err, shopList) => {
        if(err || shopList == null){
          res.send(err);
        } else {
          res.json("success");
        }
      });
    } else {
      res.send("You are not authorized to do that");
      console.log(req.user)
    }
  }
}

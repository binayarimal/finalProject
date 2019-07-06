const collabQueries = require("../db/Queries.collab.js")
module.exports = {
  collab(req,res,next){

    collabQueries.addCollaborator(req, (err) => {
      if(err){
        res.send(err);
        console.log(err);
        console.log(req.body)
      } else {
          res.send(`You've successfully added user as a collaborator`);
        }
    })
  },
  
}

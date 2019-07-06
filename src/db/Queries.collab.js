
const Collab = require("./models").Collab;
const User =  require("./models").User;

module.exports = {
  addCollaborator(req, callback){
    return User.findOne({where:{email:req.body.email}})
    .then((user)=>{
      if (!user){
        return callback("User doesnot exist")
      };
      Collab.findOne({
        where:
        {email:req.body.email,
          shopListId:req.params.id}
        })
        .then((collab)=>{
          if (collab){
            return  callback ("User is already a collaborator")
          };

          Collab.create(
            {email:user.email,
              userId:user.id,
              shopListId:req.params.id})
              .then((collaborator) => {
                callback(null);
              })
            })
          })
          .catch((err) => {
            callback(err);
          })
        },
        deleteCollab(req, callback){
          return  Collaborator.findOne(
            {where:
              {email:req.body.Collaborator,
                shopListId:req.params.id}
              }
            )
            .then((collab)=>{
              collab.destroy()
              .then (()=>{
                callback(null)
              })

            })
            .catch((err)=>{
              callback(err)
            })
          },

        }

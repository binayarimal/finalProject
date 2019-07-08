module.exports = {

// #1
  fakeIt(app){

    let  id, email;

    function middleware(req,res,next){
      id = req.query.userId || id;
      email = req.query.email || email;
    

      if(id && id != 0){
        req.user = {
          "id": id,
          "email": email,

        };

      } else if(id == 0) {
        delete req.user;
      }

      if( next ){ next() }
    }

// #6
    function route(req,res){
      res.redirect("/")
    }

    app.use(middleware)
    app.get("/auth/fake", route)
  }
}

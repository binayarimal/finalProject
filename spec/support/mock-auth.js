module.exports = {

// #1
  fakeIt(app){

    let  id, email;

// #3
    function middleware(req,res,next){

// #4

      id = req.body.userId || id;
      email = req.body.email || email;
      console.log(req.body)
// #5
      if(id && id != 0){
        req.user = {
          "id": id,
          "email": email,

        };
        console.log(req.user)
      } else if(id == 0) {
        delete req.user;
      }

      if( next ){ next() }
    }

// #6
    function route(req,res){
      res.redirect("/")
    }


    app.get("/auth/fake", route)
  }
}

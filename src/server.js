const app = require("./app");
const http = require("http");
const port = normalizePort(process.env.PORT || "5000");
const path = require('path');
const express = require('express');
const server = http.createServer(app);
const history = require('connect-history-api-fallback');
const socketIo = require('socket.io');
const itemQueries = require('./db/Queries.items.js')
const io = socketIo(server);
app.set('socketio', io);
io.on('connection', socket => {
  console.log("user connected")
  socket.on('give items', (id) => {
    itemQueries.getAllitems(id, (err, items)=>{
      if(err){
        socket.emit('err', err)
      } else {
        io.emit('show items', items)
      }
    })
  });
  socket.on('post items', (data) => {
    let newItem = {
      title: data.item,
      shopListId:data.shopListId
    };
    itemQueries.addItem(newItem, (err, item) => {
      if(err){
        console.log(err)
      } else {
        const message ="success";
        io.emit('success',message )
      }
    })

  })


  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
});
app.use(history());
app.set("port", port);
server.listen(port);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static( "client/build"));
  app.get('/', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}



server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
});

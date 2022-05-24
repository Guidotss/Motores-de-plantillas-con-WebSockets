const express = require('express'); 
const {Server:ioServer} = require('socket.io'); 
const morgan = require('morgan'); 
const http = require('http'); 
const app = express(); 
const httpServer = http.createServer(app); 
const io = new ioServer(httpServer);
const router = require('./routers/routes'); 

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(express.static(__dirname +'/public')); 
app.use('/',router)

app.set('views', 'public/views') 
app.set('view engine','ejs'); 


io.on('connection',(client) =>{
    console.log('websocket funcionando',client.id);
    
})

const PORT = 8080; 

httpServer.listen(PORT,() =>{
    console.log(`Server on port ${httpServer.address().port}`);
}); 
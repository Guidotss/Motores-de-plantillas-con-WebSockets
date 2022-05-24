require('dotenv').config(); 
const express = require('express'); 
const {Server:ioServer} = require('socket.io'); 
const morgan = require('morgan'); 
const http = require('http'); 
const app = express(); 
const httpServer = http.createServer(app); 
const io = new ioServer(httpServer);
const products = []; 
const messages = []; 


app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(express.static(__dirname +'/public')); 


app.set('views', 'public/views') 
app.set('view engine','ejs'); 

app.get('/',(req,res) =>{
    res.render('index.ejs',{products})
})


io.on('connection',(client) =>{
    console.log('websocket funcionando',client.id);
    client.emit('productos',products)

    client.on('newProduct',(product) =>{
        products.push(product); 
        io.sockets.emit('productos',products); 
        console.log(products);
    })

    client.emit('messages',messages); 
    client.on('newMessage',(message) =>{
        messages.push(message); 
        io.sockets.emit('messages',messages)
    })
})

const PORT = process.env.PORT || 3030; 

httpServer.listen(PORT,() =>{
    console.log(`Server on port ${httpServer.address().port}`);
}); 


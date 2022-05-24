const socket = io(); 
const form = document.getElementById('form'); 
const nombre = document.getElementById('nombre'); 
const precio = document.getElementById('precio'); 
const url = document.getElementById('url'); 
const productos = document.getElementById('productos')
const enviar = document.getElementById('enviar'); 
const mensaje = document.getElementById('mensaje'); 
const mail = document.getElementById('mail'); 
const divMensajes = document.getElementById('mensajes')
const fecha = new Date(); 


form.addEventListener('submit',(e) =>{
    e.preventDefault(); 
    
    const product = {
        nombre: nombre.value,
        precio: precio.value,
        url: url.value
    }; 
    socket.emit('newProduct',product); 
})

socket.on('productos',(products) =>{
    productos.innerHTML = products.map(prod =>{
        return(
            `<div class="card">
                <h5 class="card-title">Lista de productos</h5>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio </th>
                                <th scope="col">Url</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${prod.nombre}</td>
                                <td>${prod.precio}</td>
                                <td>${prod.url}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>   
            </div>
            `
        )
    })
})


enviar.addEventListener('click',() =>{
    const menssage = {
        texto: mensaje.value,
        mail: mail.value
    }

    if(mail.value == ''){
        alert('Debe ingresar su mail!')
    }else{
        socket.emit('newMessage',menssage); 
        mensaje.value = ''; 
        console.log(menssage);
    }
    
})

socket.on('messages',(messages) =>{
    divMensajes.innerHTML = messages.map(message =>{
        return(
            `<div>
                <strong>${message.mail} [${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}]: </strong>
                <em>${message.texto}</em>
            </div>`
        )
    })
})







const {Router} = require('express'); 
const router = Router(); 

const products = []; 

router.get('/',(req,res) =>{
    res.render('index.ejs')
})

router.post('/productos',(req,res) =>{
    const newProduct = req.body; 
    products.push(newProduct); 
    console.log(products);

    res.send('agregado')
})


module.exports = router; 
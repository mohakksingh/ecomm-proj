const productService=require('../services/product.service')

const createProduct=async(req,res)=>{
    try{
        const product=await productService.createProduct(req.body)
        return res.status(200).send(product)
    }catch(e){
        console.log(e);
        return res.status(500).send({
            message:e.message
        })
    }
}

const deleteProduct=async(req,res)=>{
    const productId=req.params.id
    try{
        const product=await productService.deleteProduct(productId)
        return res.status(200).send(product)
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
}

const updateProduct=async(req,res)=>{
    const productId=req.params.id
    try{
        const product=await productService.updateProduct(productId,req.body)
        return res.status(200).send(product)
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
}

const findProductById=async(req,res)=>{
    const productId=req.params.id
    try{
        const product=await productService.findProductById(productId)
        return res.status(200).send(product)
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
}

const getAllProducts=async(req,res)=>{
    const productId=req.params.id
    try{
        const products=await productService.getAllProducts(req.query)
        return res.status(200).send(products)
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
    
}

const createMultipleProduct=async(req,res)=>{
    const productId=req.params.id
    try{
        const products=await productService.getAllProducts(req.body)
        return res.status(200).send({message:"Products created successfully"})
    }catch(e){
        return res.status(500).send({
            message:e.message
        })
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProduct
}


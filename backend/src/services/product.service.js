const Category = require("../models/category.model");
const Product = require("../models/products.model");

async function createProduct(reqData){
    let topLevel=await Category.findOne({reqData})
    
    if(!topLevel){
        topLevel=new Category({
            name:reqData.topLevelCategory,
            level:1
        })
        await topLevel.save()
    }
    let secondLevel=await Category.findOne({
        name:reqData.secondLevelCategory,
        parentCategory:topLevel._id
    })
    

    if(!secondLevel){
        secondLevel=new Category({
            name:reqData.secondLevelCategory,
            parentCategory:topLevel._id,
            level:2
        })
        await secondLevel.save()
    }
    let thirdLevel=await Category.findOne({
        name:reqData.thirdLevelCategory,
        parentCategory:secondLevel._id
    })

    if(!thirdLevel){
        thirdLevel=new Category({
            name:reqData.thirdLevelCategory,
            parentCategory:secondLevel._id,
            level:3
        })
        await thirdLevel.save()
    }

    const product= new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discountedPrice:reqData.discountedPrice,
        discountedPercent:reqData.discountedPercent,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,    
        sizes:reqData.sizes,
        quantity:reqData.quantity,
        category:thirdLevel._id
    })
    
    return await product.save()
}

async function deleteProduct(productId){
    const product=await findProductById(productId)
    await Product.findByIdAndDelete(productId)
    return "Product deleted"
}

async function updateProduct(productId,reqData){
    return await Product.findByIdAndUpdate(productId,reqData)
}

async function findProductById(productId){
    const product=await Product.findById(productId).populate('category').exec()

    if(!product){
        throw new Error("Product not found" + id)
    }
    return product;
}

async function getAllProducts(reqQuery){
    let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}=reqQuery
    pageSize=pageSize || 10
    let query=Product.find().populate("category")
    if(category){
        const existCategory=await Category.findOne({name:category})
        if(existCategory){
            query=query.where("category").equals(existCategory._id)
        }else{
            return {content:[],currentPage:1,totalPages:0}
        }

    }
    if(color){
        const colorSet=new Set(color.split(",").map(color=>color.trim().toLowerCase()))

        const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null;
        query=query.where("color").regex(colorRegex)
    }
    if(sizes){
        const sizesSet=new Set(sizes);
        query.query.where("sizes.name").in([...sizesSet])
    }
    if(minPrice && maxPrice){
        query=query.where("discountedPrice").get(minPrice).lte(maxPrice)
    }
    if(minDiscount){
        query=query.where("discountedPercent").gt(minDiscount)
    }
    if(stock){
        if(stock =="in_stock"){
            query=query.where("quantity").gt(0)
        }
        if(stock=="out_of_stock"){
            query=query.where("quantity").lt(1)
        }
    }
    if(sort){
        const sortDirection=sort==="price_high"?-1:1
        query=query.sort({discountedPrice:sortDirection})
    }
    const totalProducts=await Product.countDocuments(query)

    const skip=(pageNumber-1)*pageSize;

    query=query.skip(skip).limit(pageSize)

    const products=await query.exec()

    const totalPages=Math.ceil(totalProducts/pageSize)

    return {content:products,currentPage:pageNumber,totalPages}
}

async function createMultipleProduct(products){
    for(let product of products){
        await createProducts(product)
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
import Products from '../models/products.js'

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({err: err})
    }
} 


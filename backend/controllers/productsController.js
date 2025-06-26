import Products from '../models/products.js'
import cache from '../utils/cache.js'


export const getProducts = async (req, res) => {
    try {
        const key = 'products'
        const cachedProducts = cache.get(key)

        if (cachedProducts) {
             res.status(200).json(cachedProducts)
            return
        }
 
        const products = await Products.find()

        cache.set(key, products);

        res.status(200).json(products)

    } catch (err) {
        res.status(500).json({ err: err })
    }
}


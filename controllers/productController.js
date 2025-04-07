const db = require('../utils/db_01').getConnection();

const all = async (req, res) => {
    try {
        const products = await db.collection('products')
            .find()
            .toArray();
        res.json(products)
    } catch (error) {
        res.json(error)
    }
}

const create = async (req, res) => {
    const newProduct = req.body;
    try {
        const result = await db.collection("products").insertOne(newProduct);
        if (result.acknowledged) {
            res.json({ message: "Products create success!", result })
        } else {
            res.json({ message: "Products create fails!" })
        }
    } catch (error) {
        res.json(error)
    }
}

// data retrive by aggregate
const filterByCategory = async (req, res) => {
    const result = await db.collection('products')
        .aggregate([
            { $match: { rate: { $lte: Number(req.params.rate) } } },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    totalPrice: { $sum: "$price" },
                    totalRating: { $sum: "$rate" },
                    minprice: { $min: "$price" },
                    maxprice: { $max: "$price" },

                }
            },
            // { $sort: { rate: -1 } },
            // { $skip: 2 },
            // { $limit: 3 }
            // { $project: { count: 1, maxprice: 1, _id: 0, multi: { $multiply: ["$count", "$minprice"] } } }
        ])
        .toArray()
    res.json(result)
}

module.exports = {
    all, create, filterByCategory
}
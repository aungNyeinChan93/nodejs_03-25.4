const express = require('express')
const { connectDB } = require('./utils/db_01')

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;


connectDB((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`Server is runnning in port ${port}`);
        })
        init()
    } else {
        console.log('DB connection is fail');
    }
})

const init = () => {

    // home
    const homeRouter = require('./routes/home')
    app.use('/api/home', homeRouter)

    // products
    const productsRouter = require('./routes/products');
    app.use('/api/products', productsRouter)

}
import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import dbconnection from './db/db.js';
import cors from 'cors'
import adminRoute from './routes/admin.routes.js'
import categoryRoute from './routes/category.routes.js'
import subCategoryRoute from './routes/subcategory.routes.js'
import productRoute from './routes/product.routes.js'

dbconnection();
const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/sub-category', subCategoryRoute);
app.use('/api/v1/product', productRoute);

app.listen(PORT, () => console.log('server is running on port', PORT))

// highprogrammer
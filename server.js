const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const UserRoute = require('./Routes/User')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require("swagger-ui-express")
const dotenv = require('dotenv')
const CarRoute = require('./Routes/Car')
const ProductRoute = require('./Routes/Product')
const EntretienRoute = require('./Routes/Entretien')
const FavorieRoute = require('./Routes/Favorie')
const swaggerDocument = require('./swagger.json')

///////
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51MDmEvEbHfjP9Lzb79VCDTAHz5MFshTKhUFv7dcg7VwgnqEk7ko05V12CRemSDA3huKwtFzOhvcsz7yIqjVgZ8sI00rIde2zOH');

//////

mongoose.connect('mongodb://mongo/CarNote', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',(err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database connection established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use('/uploads',express.static('uploads'))
const Port = process.env.Port || 3000
const hostname = "0.0.0.0"

///////////////////////////////////////////////////////

const calculateOrderAmount = (ListProducts) => {
  const total = ListProducts.reduce((previous, current) => {
    return previous.prix + current.prix
  })
  return total * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const  ListProducts  = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(ListProducts),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

/////////////////////////////////////////////////////

app.listen(Port, hostname ,() =>{
  console.log(`Server is running on ${hostname}:${Port}`)
})

  app.use('/swagger/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  app.use('/api/user', UserRoute)
  app.use('/api/car', CarRoute)
  app.use('/api/product', ProductRoute)
  app.use('/api/entretien', EntretienRoute)
  app.use('/api/favorie', FavorieRoute)






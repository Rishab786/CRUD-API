const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const booksRouter = require("./routes/book");
const config = require("./utility/config");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const URL = config.MONGO_URL;
const PORT = config.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/books", booksRouter);

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Book API',
        version: '1.0.0',
        description: 'CRUD API for managing a collection of books',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  
  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

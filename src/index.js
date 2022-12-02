const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const swagger = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const bodyParser = require('body-parser');
const handleError = require('./util/handlerError');
const path = require('path');
const morgan = require('morgan');

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();


app
    .use(morgan(':status :method :url :response-time ', {
        skip: function (req, res) { return res.statusCode < 400 }
    }))
    .use('/static/image', express.static(path.join(__dirname, 'public/images')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
    .use(cors({
        origin: ['*'],
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
    }))
    .use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));



app.get('/', (req, res) => { res.send(`<h1>Server SuperMarket is running </h1>${Math.random(0, PORT)}`); });
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

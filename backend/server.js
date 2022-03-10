const express = require('express');
// const neo4j = require('neo4j-driver');
const neo4jMiddleware = require('./middleware/neo4j.js');
const cors = require('cors');
const redis = require('redis');
// const redisMiddleware = require('./middleware/redis-middleware.js');

// require('dotenv').config();

const app = express();
const port = 5005;

// Middleware

app.use(express.json());
app.use(cors());

const client = redis.createClient();

client.connect()

app.locals.redisClient = client;

process.on('SIGTERM', () => {
    if (app.locals.redisClient) {
        app.locals.redisClient.disconnect();
        delete app.locals.redisClient;
    }
    server.close();
  })

// app.use(redisMiddleware.RedisMiddleware.clientSetup);
// app.use(redisMiddleware.RedisMiddleware.clientCleanup)

app.use(neo4jMiddleware.Neo4j.sessionSetup);
app.use(neo4jMiddleware.Neo4j.sessionCleanup);


// Routes

const tRoutes = require("./routes/FullTransaction/transaction.routes");
app.use('/api/transactions', tRoutes);

const dRoutes = require('./routes/District/district.routes');
app.use('/api/districts', dRoutes)

const yRoutes = require('./routes/Year/year.routes');
app.use('/api/years', yRoutes)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

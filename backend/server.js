const express = require('express');
// const neo4j = require('neo4j-driver');
const neo4jMiddleware = require('./middleware/neo4j.js');
const cors = require('cors');
const redis = require('redis');
const auth = require('./middleware/authentication');
// var path = require('path');
// var fs = require('fs-extra');
const fileUpload = require('express-fileupload');
require("dotenv").config();
// const redisMiddleware = require('./middleware/redis-middleware.js');

const app = express();
const port = 5005;

// Middleware

app.use(express.json());
app.use(cors());
app.use(fileUpload());
// app.use(express.static(path.join(__dirname, 'public')));

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


app.use(auth.Authentication.setUser)

// Routes

const tRoutes = require("./routes/FullTransaction/transaction.routes");
app.use('/api/transactions', tRoutes);

const dRoutes = require('./routes/District/district.routes');
app.use('/api/districts', dRoutes)

const yRoutes = require('./routes/Year/year.routes');
app.use('/api/years', yRoutes)

const uRoutes = require("./routes/User/user.routes");
app.use('/api/users', uRoutes);

const aRoutes = require("./routes/Admin/admin.routes");
app.use('/api/admin', aRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

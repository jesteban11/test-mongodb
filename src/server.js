const express = require('express');
const userRoutes = require('./routes/users');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const mongoDatabase = require('./config/mongo-database');

// Define routes
app.use('/users', userRoutes);

// Start the server
mongoDatabase.connect().
    then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(`Failed to connect to MongoDB: ${err}`);
    });
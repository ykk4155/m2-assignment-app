
require('dotenv').config();
require('./models/Registration');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection err: ${err.message}`);
    });

    const app = require('./app');
    const server = app.listen(5000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});

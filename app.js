const express = require('express');
const cors  = require('cors');
const app = express();

require('dotenv').config();
const pool = require('./db/connect');

const eventRouter = require('./routes/events');
const authRouter = require('./routes/auth');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());
app.use(cors());

app.use('/api/v1', authRouter);
app.use('/api/v1', eventRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 

const port = process.env.PORT || 5005;

pool.execute("SELECT * FROM events", function(err, result) {
    if (err) {
            console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
});
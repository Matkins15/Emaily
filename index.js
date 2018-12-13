const express = require('express');
const app = express();

// '/' === route route
app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

// dynamic port: environment variable used by heroku to indentify a port || locally on port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);
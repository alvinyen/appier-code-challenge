const express = require('express');
let app = express();
const port = require('./config/config').port ;
const rootRoutes = require('./routes/rootRoutes');

rootRoutes(app) ;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
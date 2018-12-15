const path = require('path'); // node build in module for resolving ../ path
// join method get rid of ../ path, avoid in and out of a dir
const publicPath = path.join(__dirname, '../public'); // __dirname meaning current dir
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
//server public directry
app.use(express.static(publicPath));


app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});


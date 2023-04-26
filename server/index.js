const express = require('express');
const bosyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bosyParser.json());
app.use(cors());

const posts =  require('./routes/api/posts');

app.use('/api/posts', posts);

//Handle production
if(process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
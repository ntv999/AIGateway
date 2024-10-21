const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const wineDescriptionRoutes = require('./routes/wineDescription');

app.use(express.json());

app.use('/api', wineDescriptionRoutes);

app.listen(PORT, () => {
    console.log('Server started on PORT: ', PORT);
});
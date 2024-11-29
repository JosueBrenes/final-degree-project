const cors = require('cors');
const express = require('express');
const connectDB = require('./src/config/db');
const exampleRoutes = require('./src/routes/exampleRoutes');

const app = express(); 

connectDB();

app.use(cors()); 
app.use(express.json());

app.use('/api/example', exampleRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

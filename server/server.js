const express = require('express');
const app = express();
app.use(express.json());
const dbConfig = require('./config/dbConfig');
const usersRoute = require('./routes/usersRoute');
const PORT = process.env.PORT ||3800;

app.use('/api/users', usersRoute);

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});
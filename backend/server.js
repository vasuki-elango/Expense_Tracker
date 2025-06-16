require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path')

const authRoutes = require('./routes/authRoutes')
const incomeRoutes = require('./routes/incomeRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
connectDB();

app.use(cors(
    {
        origin: process.env.CLIENT_URL || '*', 
        methods:['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders:['content-type', 'Authorization'],
    }
))
app.use(express.json())
  
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/api/auth',authRoutes)
app.use('/api/income',incomeRoutes)
app.use('/api/expense',expenseRoutes)
app.use('/api/dashboard',dashboardRoutes)

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
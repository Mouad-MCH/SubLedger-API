import express from 'express';
import authRoutes from './routes/auth.routes.js'
import helmet from 'helmet';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors())



app.use('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date(),
        service: 'Habit Tracker API',
    })
})


app.use('/auth', authRoutes);


export { app };
export default app;
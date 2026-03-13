import express from 'express';
import authRoutes from './routes/auth.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { errHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import helmet from 'helmet';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());



app.use('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date(),
        service: 'Habit Tracker API',
    })
})


app.use('/auth', authRoutes);
app.use('/subscription', subscriptionRoutes)
app.use('/admin', adminRoutes)


app.use(notFound)
app.use(errHandler);


export { app };
export default app;
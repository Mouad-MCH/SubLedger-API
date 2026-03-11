import { app } from './server.js';
import { ENV } from '../env.js';
import { connectDB } from './config/db.js';

await connectDB()

app.listen(ENV.PORT, () => {
    console.log(`server running on http://localhost:${ENV.PORT}`);
})

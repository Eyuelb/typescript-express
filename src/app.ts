import express from 'express';
import { errorHandler } from './middleware/errorHandler.middleware';
import exampleRouter from './routes/example.routes';
  
const app = express();
app.use(express.json());

const port = 9000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the route modules
app.use('/api', exampleRouter);
// Add the error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



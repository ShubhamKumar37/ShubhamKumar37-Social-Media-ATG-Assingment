import { dbConnect } from './config/database.config.js';
import app from './app.js';

dbConnect()
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(
        `Server is running on port = http://localhost:${process.env.PORT}`
      )
    )
  )
  .catch((error) => {
    console.log('Error while connecting to database :: ', error);
    process.exit(1);
  });

app.on('error', (error) =>
  console.log('There is while initializing server :: ', error)
);

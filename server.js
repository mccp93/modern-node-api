const { API_ROUTES } = require('./constants');
const express = require('express');
const setupMiddleware = require('./utils/middleware');
const {
  playerRouter,
  resultRouter,
  fixtureRouter,
  userRouter,
  postRouter,
} = require('./routers');
const connectToDatabase = require('./utils/db');
const app = express();
setupMiddleware(app);

app.use(API_ROUTES.PLAYERS, playerRouter);
app.use(API_ROUTES.RESULTS, resultRouter);
app.use(API_ROUTES.FIXTURES, fixtureRouter);
app.use(API_ROUTES.USERS, userRouter);
app.use(API_ROUTES.POSTS, postRouter);

const startServer = async () => {
  try {
    await connectToDatabase({
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT, () => {
      console.log(`Application is up and running on PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = startServer;

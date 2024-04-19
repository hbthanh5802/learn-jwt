const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const apiRouter = require('express').Router();

function useRoutes(app) {
  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/user', userRoutes);

  app.use('/api', apiRouter);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
}

module.exports = useRoutes;

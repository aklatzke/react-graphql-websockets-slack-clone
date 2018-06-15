import { Router } from 'express';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/../../public/build/es6-unbundled/index.html");
});

export default routes;

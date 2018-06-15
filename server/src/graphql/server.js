import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import schema from './schema';
 
const WS_PORT = 8079;
 
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});
 
websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));
 
const subscriptionServer = SubscriptionServer.create({ //eslint-disable-line no-unused-vars
    schema,
    execute,
    subscribe,
  },
  {
    server: websocketServer,
    path: '/subscriptions',
  },
);
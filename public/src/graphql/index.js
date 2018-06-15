import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import WebSocketLink from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getOperationAST } from 'graphql';
import gqlTag from 'graphql-tag';
 
const WS_END = "ws://localhost:8079/subscriptions";
const HTTP_END = "http://localhost:8080/graphql";

const link = ApolloLink.split(
    operation => {
        const operationAST = getOperationAST(operation.query, operation.operationName);
        return !!operationAST & operationAST.operation === 'subscription';
    },
    new WebSocketLink({
        uri: WS_END,
        options: {
            reconnect: true
        }
    }),
    new HttpLink({ uri: HTTP_END })
);

const cache = new InMemoryCache(window.__APOLLO_STATE);

export const client = new ApolloClient({
    link,
    cache
})   

export const gql = gqlTag; 
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

import channelType from './types/channel'
import commentType from './types/comment'
import userType from './types/user';

import resolvers from '../resolvers';

const query = new GraphQLObjectType({
    name: 'Query',
    fields : () => ({
        allChannels: {
          type: GraphQLList(channelType),
          resolve: () => resolvers.channels.findAll()
        },
    })
})

const mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: () => ({
        addChannel: {
            type: channelType,
            args : {
                name: {
                    type: GraphQLString
                },
                type: {
                    type: GraphQLString
                }
            },
            resolve: (root, { name,  type}) => resolvers.channels.insert({ name, type })
        },

        addUser : {
            args: {
                displayName: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                emailVerified: {
                    type: GraphQLBoolean
                },
                photoURL: {
                    type: GraphQLString
                },
                uid: {
                    type: GraphQLString
                }
            },
            resolve: (root, args) => resolvers.users.insert(args)
        }
    })
})

const subscriptions = new GraphQLObjectType({
    name: 'Subscriptions',
    fields: () => ({
        newChannel: {
            type: channelType,
            ...resolvers.subscriptions.newChannel
        },
        newUser: {
            type: userType,
            ...resolvers.subscriptions.newUser
        }
    })
})

export default new GraphQLSchema({
  query: query,
  mutation: mutations,
  subscription: subscriptions,
  types: [
      channelType,
      commentType,
      userType
  ]
})
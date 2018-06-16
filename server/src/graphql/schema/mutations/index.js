import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
} from 'graphql'

import channelType from '../types/channel';
import userType from '../types/user';
import commentType from '../types/comment';

import resolvers from '../../resolvers';

export default new GraphQLObjectType({
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
            type: userType,
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
        },

        addMessage: {
            type: commentType,
            args: {
                content: {
                    type: GraphQLString
                },
                author: {
                    type: GraphQLString
                },
                channel: {
                    type: GraphQLString
                }
            },
            resolve: (root, args) => resolvers.comments.insert(args)
        },
 
        subscribeToChannel: {
            type: channelType,
            args: {
                channelId: {
                    type: GraphQLString
                },
                userId: {
                    type: GraphQLString
                }
            },
            resolve: (root, args) => resolvers.users.addChannel( args )
        }
    })
})
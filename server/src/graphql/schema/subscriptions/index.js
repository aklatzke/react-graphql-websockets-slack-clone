import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import resolvers from '../../resolvers';

import channelType from '../types/channel';
import userType from '../types/user';
import commentType from '../types/comment';

export default new GraphQLObjectType({
    name: 'Subscriptions',
    fields: () => ({
        newChannel: {
            type: channelType,
            ...resolvers.subscriptions.newChannel
        },
        newUser: {
            type: userType,
            ...resolvers.subscriptions.newUser
        },
        newComment: {
            type: commentType,
            args: {
                channelId: {
                    type: GraphQLString
                }
            },
            ...resolvers.subscriptions.newComment
        }
    })
})
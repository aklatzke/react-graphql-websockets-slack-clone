import {
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import userType from './user';

export default new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        _id: {
            type: GraphQLString,
            description: 'ObjectId'
        },
        content: {
            type: GraphQLString,
            description: 'Comment content'
        },
        author: {
            type: userType,
            description: 'Author of the comment'
        },
        timestamp: {
            type: GraphQLFloat,
            descritpion: 'Timestamp comment was posted'
        },
        channel: {
            type: GraphQLString,
            description: 'Channel this comment belongs to'
        }
    })
})
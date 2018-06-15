import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';


export default new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        content: {
            type: GraphQLString,
            description: 'Comment content'
        },
        author: {
            type: GraphQLString,
            description: 'Author of the comment (id)'
        },
        timestamp: {
            type: GraphQLInt,
            descritpion: 'Timestamp comment was posted'
        }
    })
})
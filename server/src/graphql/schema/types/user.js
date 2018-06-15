import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';


export default new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: {
      type: GraphQLString,
    },
    displayName: {
      type: GraphQLString,
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
  })
})
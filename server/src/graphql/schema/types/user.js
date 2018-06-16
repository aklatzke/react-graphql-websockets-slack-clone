import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

import channelType from './channel';

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
    },
    channels: {
      type: GraphQLList(channelType)
    }
  })
})
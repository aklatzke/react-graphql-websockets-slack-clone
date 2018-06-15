import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLEnumType
} from 'graphql'; 

import commentType from './comment';

const channelTypeEnum = new GraphQLEnumType({
  name: 'ChannelTypeEnum',
  description: 'Available types for channels.',
  values: {
    PRIVATE: {
      value: "PRIVATE",
      description: 'A private channel (invite only)',
    },
    PUBLIC: {
      value: "PUBLIC",
      description: 'A public channel',
    },
    CONVERSATION: {
      value: "CONVERSATION",
      description: 'A conversation between two individuals (no invites)',
    },
  },
});

export default new GraphQLObjectType({
    name : "ChannelType",
    fields: () =>  ({
        name: {
            type: GraphQLString,
            description: 'Name of the channel'
        },
        type: {
            type: channelTypeEnum
        },
        comments: {
            type: GraphQLList(commentType)
        },
        _id: {
            type: GraphQLString
        }
    })
})
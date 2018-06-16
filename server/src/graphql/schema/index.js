import {
  GraphQLSchema
} from 'graphql';

import channelType from './types/channel'
import commentType from './types/comment'
import userType from './types/user';

import query from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';

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
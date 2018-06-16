import { withFilter } from 'graphql-subscriptions';
import actions from '../actions';

const pubsub = actions.pubsub;

export default () => ({
    newChannel : {
        subscribe: withFilter(
            () => pubsub.asyncIterator( actions.CHANNEL_TOPIC ),
            () => true
        )
    },

    newUser: {
        subscribe: withFilter(
            () => pubsub.asyncIterator( actions.USER_TOPIC ),
            () => true
        )
    },

    newComment: {
        subscribe: withFilter(
            () => pubsub.asyncIterator( actions.NEW_COMMENT_TOPIC ),
            ( payload, variables ) => variables.channelId === payload.newComment.channel
        )
    }
})
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
    }
})
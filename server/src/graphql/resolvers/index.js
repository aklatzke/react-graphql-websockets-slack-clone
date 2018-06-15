import mongo from 'then-mongo';

import channels from './channels';
import subscriptions from './subscriptions';

const db = mongo(process.env.MONGODB_URL || 'slackClone', ['channel', 'comment', 'user']);

export default {
    channels: channels(db),
    subscriptions: subscriptions(db)
}
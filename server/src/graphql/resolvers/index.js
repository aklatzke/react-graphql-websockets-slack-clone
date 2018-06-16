import mongo from 'then-mongo';

import channels from './channels';
import subscriptions from './subscriptions';
import users from './users';
import comments from './comments';

const db = mongo(process.env.MONGODB_URL || 'slackClone', ['channel', 'comment', 'user']);

export default {
    channels: channels(db),
    subscriptions: subscriptions(db),
    users: users(db),
    comments: comments(db)
}
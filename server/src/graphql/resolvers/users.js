import actions from '../actions';

const pubsub = actions.pubsub;

export default (db) => ({
    insert: ({
        displayName, 
        email, 
        emailVerified, 
        photoURL, 
        uid
    }) => db.user.update({email}, {displayName, email, emailVerified, photoURL, uid}, { upsert: true })
            .then((err, data) => {
                pubsub.publish(actions.USER_TOPIC, {
                    newUser: { ...data}
                })

                return data;
            }),

    getUser : (email) => db.user.findOne({ email: email }),

    addChannel: ({ userId, channelId }) => db.user.update( { _id: db.ObjectId(userId) }, {
        channel: {
            $push: channelId
        }
    } ).then( data => {
        console.log(data)
    } )
})
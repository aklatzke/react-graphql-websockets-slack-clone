import actions from '../actions';

const pubsub = actions.pubsub;

export default (db) => ({
    insert: ({
        displayName, 
        email, 
        emailVerified, 
        photoURL, 
        uid
    }) => {
        return db.user.findOne({email})
                .then((data) => {
                    if( data._id ){
                        return data;
                    }
                    else{
                        db.user.insert({
                          displayName,
                          email,
                          emailVerified,
                          photoURL,
                          uid
                        }).then( (data) => {
                            pubsub.publish(actions.USER_TOPIC, {
                                newUser: { ...data }
                            })
                            return data;
                        })
                    }
                })
    },

    getUser : (email) => db.user.findOne({ email: email }).then(data => {
        if( ! data.channels )
            data.channels = []

        return db.channel.find({
            _id : {
                $in: data.channels.map( str => db.ObjectId(str) )
            }
        }).then(response => {
            data.channels = response;
            return data;
        })
    }),

    addChannel: ({ userId, channelId }) => db.user.update( { _id: db.ObjectId(userId) }, {
        $addToSet : {
            channels: channelId
        }
    } ).then( () => {
        return {}
    } )
})
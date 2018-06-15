import actions from '../actions';

const pubsub = actions.pubsub;

export default (db) => ({
    insert: ({displayName, email, emailVerified, photoURL, uid}) => db.user.insert({ displayName, email, emailVerified, photoURL, uid })
        .then( data =>  pubsub.publish(actions.USER_TOPIC, {
            newUser: {...data}
        })) 
})
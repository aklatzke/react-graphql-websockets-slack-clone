import actions from '../actions';

const pubsub = actions.pubsub;

export default (db) => ({
    findAll: () => db.channel.find({}), 
    insert: ({name, type}) => db.channel.insert({ name, type })
        .then( data =>  pubsub.publish(actions.CHANNEL_TOPIC, {
            newChannel: {...data}
        })) 
})
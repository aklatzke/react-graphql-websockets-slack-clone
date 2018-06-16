import actions from '../actions';

const pubsub = actions.pubsub;

export default (db) => ({
    findAll: () => db.channel.find({}), 

    insert: ({name, type}) => db.channel.insert({ name, type })
        .then( data =>  pubsub.publish(actions.CHANNEL_TOPIC, {
            newChannel: {...data}
        })),

    get: (id) => db.channel.findOne({ _id: db.ObjectId(id) })
                .then(data => {
                    return db.comment.find({ channel: data._id.toString() })
                        .then( comments => {
                            let authorIds = comments.map(comment => db.ObjectId(comment.author));

                            return db.user.find({
                                _id: {
                                    $in: authorIds
                                }
                            }).then( authors => {
                                let authorMap = {};

                                authors.forEach( item => authorMap[item._id.toString()] = item );

                                data.comments = comments.map( comment => {
                                    let authorId = comment.author;

                                    comment.author = authorMap[authorId];

                                    return comment;
                                } )

                                return data;
                            })
                        })
                })
})
import actions from '../actions';

const pubsub = actions.pubsub; 

export default (db) => ({
    insert: ({ content, author, channel }) => db.comment.insert({ timestamp: Date.now(), content, author, channel })
                                                .then( data => {
                                                    return db.user.findOne({ _id: db.ObjectId( data.author ) }).then( author => {
                                                        data.author = author;
                                                        
                                                        pubsub.publish( actions.NEW_COMMENT_TOPIC, {
                                                            newComment: data
                                                        })

                                                        return data;
                                                    } )
                                                }) , 
})
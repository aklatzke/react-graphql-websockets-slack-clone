import { gql } from './index';

export const INTIIAL_CHANNEL_QUERY = gql`
    query allChannels{
        allChannels{
            name,
            type,
            _id
        }
    }
`;

export const CHANNEL_INSERT_MUTATION = gql`
    mutation addChannel( $name: String!, $type: String! ){
        addChannel( name: $name, type: $type ){
            name,
            type,
            _id
        }
    }
`;

export const CHANNEL_ADD_MUTATION = gql`
    mutation subscribeToChannel( $channelId: String!, $userId: String! ){
        subscribeToChannel( channelId: $channelId, userId: $userId ){
            name,
            type,
            _id
        }
    }
`; 

export const CHANNEL_SUBSCRIPTION = gql`
    subscription newChannel{
        newChannel{
            name,
            type,
            _id
        }
    }
`;

export const SINGLE_CHANNEL_QUERY = gql`
    query singleChannel( $id: String! ){
        singleChannel(id: $id){
            _id,
            name,
            type,
            comments{
                content,
                timestamp,
                author{
                    displayName,
                    email,
                    _id
                }
            }
        }
    }
`;

export const ADD_MESSAGE_MUTATION = gql`
    mutation addMessage( $content: String!, $author: String!, $channel: String! ){
        addMessage( content: $content, author: $author, channel: $channel ){
            _id,
            content,
            timestamp,
            channel,
            author{
                displayName,
                email,
                _id
            }
        }
    }
`;

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription newComment( $channelId: String! ){
        newComment( channelId: $channelId ){
            _id,
            content,
            timestamp,
            channel,
            author{
                _id,
                displayName,
                email
            }
        }
    }
`;

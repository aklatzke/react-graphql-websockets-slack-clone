import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';

import channelType from '../types/channel';
import userType from '../types/user';

import resolvers from '../../resolvers';


export default new GraphQLObjectType({
    name: 'Query',
    fields : () => ({
        allChannels: {
          type: GraphQLList(channelType),
          resolve: () => resolvers.channels.findAll()
        },

        currentUser: {
            type: userType,
            args: {
                email: {
                    type: GraphQLString
                }
            },
            resolve: (root, {email}) => resolvers.users.getUser(email)
        },

        singleChannel: {
            type: channelType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (root, {id}) => resolvers.channels.get(id)
        }
    })
})
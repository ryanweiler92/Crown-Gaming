const { User} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user){
            const userData = User.findOne({ _id: context.user._id })
            .select('-__v -password');

            return userData
            }
            throw new AuthenticationError('Not logged in!')
        },
        
        users: async () => {
            return await User.find({})
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
        saveWishListGame: async (parent, {id, name, description, background_image, metacritic, playTime, released, genres, screenshots, tags, developers, platforms, stores, createdAt}, context) => {
            if (context.user) {
                
                const updatedUser = await User
                .findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {wishListGames: { id, name, description, background_image,
                                                  metacritic, playTime, released, genres,
                                                  screenshots, tags, developers, platforms,
                                                  stores, createdAt} } },
                    { new: true}
                );
                return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        saveFavoriteGameList: async (parent, {id, name, description, background_image, metacritic, playTime, released, genres, screenshots, tags, developers, platforms, stores, createdAt}, context) => {
            if (context.user) {
                
                const updatedUser = await User
                .findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {favoriteGames: { id, name, description, background_image,
                                                  metacritic, playTime, released, genres,
                                                  screenshots, tags, developers, platforms,
                                                  stores, createdAt} } },
                    { new: true}
                );
                return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeFavoriteGame: async (parent, {id}, context) => {
            if (context.user) {
              const updatedUser = await User
              .findOneAndUpdate(
                {_id: context.user._id},
                { $pull: {favoriteGames: {id}}},
                { new: true }
              )
              return updatedUser
            }
            throw new AuthenticationError('Not logged in');
          },
          removeWishListGame: async (parent, {id}, context) => {
            if (context.user) {
              const updatedUser = await User
              .findOneAndUpdate(
                {_id: context.user._id},
                { $pull: {wishListGames: {id}}},
                { new: true }
              )
              return updatedUser
            }
            throw new AuthenticationError('Not logged in');
          },
    }
}


module.exports = resolvers
const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    wishListGames: [Game]
    favoriteGames: [Game]
}

type Game {
    id: Int
    name: String!
    description: String
    background_image: String
    metacritic: Int
    playTime: Int
    released: String
    genres: [String]
    screenshots: [String]
    tags: [String]
    developers: [String]
    platforms: [String]
    stores: [String]
    createdAt: String
}

type Auth {
    token: ID
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User  
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveWishListGame(
        id: Int
        name: String!
        description: String
        background_image: String
        metacritic: Int
        playTime: Int
        released: String
        genres: [String]
        screenshots: [String]
        tags: [String]
        developers: [String]
        platforms: [String]
        stores: [String]
        createdAt: String
    ): User
    saveFavoriteGameList(
        id: Int
        name: String!
        description: String
        background_image: String
        metacritic: Int
        playTime: Int
        released: String
        genres: [String]
        screenshots: [String]
        tags: [String]
        developers: [String]
        platforms: [String]
        stores: [String]
        createdAt: String
    ): User
    removeFavoriteGame( id: Int!): User
}
`

module.exports = typeDefs
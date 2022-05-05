import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      token
      user {
        username
        email
        _id
      }
    }
  }
`

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password){
        token 
        user{
      _id
      username 
      email
    }
  }
}
`

export const SAVE_WISH_LIST_GAME = gql`
mutation saveWishListGame( $id: Int, $name: String!, $description: String, $background_image: String,
                            $metacritic: Int, $playTime: Int, $released: String, $genres: [String],
                            $screenshots: [String], $tags: [String], $developers: [String], $platforms: [String],
                            $stores: [String], $createdAt: String){
saveWishListGame(id: $id, name: $name, description: $description, background_image: $background_image,
                  metacritic: $metacritic, playTime: $playTime, released: $released, genres: $genres,
                  screenshots: $screenshots, tags: $tags, developers: $developers, platforms: $platforms,
                  stores: $stores, createdAt: $createdAt){
      _id
      username
      email
      wishListGames{
            id
            name
            description
            background_image
            metacritic
            playTime
            released
            genres
            screenshots
            tags
            developers
            platforms
            stores
            createdAt
                  }
            }
        }
`

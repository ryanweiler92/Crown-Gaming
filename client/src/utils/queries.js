import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me{
      username
      email
      _id
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
  favoriteGames{
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
`;

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
    }
}
`
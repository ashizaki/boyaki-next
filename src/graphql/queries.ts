/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFollowRelationship = /* GraphQL */ `
  query GetFollowRelationship($followeeId: ID!, $followerId: ID!) {
    getFollowRelationship(followeeId: $followeeId, followerId: $followerId) {
      followeeId
      followerId
      timestamp
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      content
      id
      owner
      timestamp
      type
    }
  }
`;
export const listFollowRelationships = /* GraphQL */ `
  query ListFollowRelationships(
    $followeeId: ID!
    $limit: Int
    $nextToken: String
    $sortDirection: SortDirection
  ) {
    listFollowRelationships(
      followeeId: $followeeId
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        followeeId
        followerId
        timestamp
      }
      nextToken
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $id: ID
    $limit: Int
    $nextToken: String
    $owner: String
    $sortDirection: SortDirection
  ) {
    listPosts(
      id: $id
      limit: $limit
      nextToken: $nextToken
      owner: $owner
      sortDirection: $sortDirection
    ) {
      items {
        content
        id
        owner
        timestamp
        type
      }
      nextToken
    }
  }
`;

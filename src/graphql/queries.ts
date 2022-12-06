/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      content
      id
      owner
      ownerName
      timestamp
      type
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
        ownerName
        timestamp
        type
      }
      nextToken
    }
  }
`;

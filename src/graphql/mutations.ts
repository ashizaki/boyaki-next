/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFollowRelationship = /* GraphQL */ `
  mutation CreateFollowRelationship($input: FollowRelationshipInput!) {
    createFollowRelationship(input: $input) {
      followeeId
      followerId
      timestamp
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      content
      id
      owner
      timestamp
      type
    }
  }
`;
export const createTimeline = /* GraphQL */ `
  mutation CreateTimeline($input: CreateTimelineInput) {
    createTimeline(input: $input) {
      post {
        content
        id
        owner
        timestamp
        type
      }
      timestamp
      userId
    }
  }
`;
export const deleteFollowRelationship = /* GraphQL */ `
  mutation DeleteFollowRelationship($followeeId: ID!) {
    deleteFollowRelationship(followeeId: $followeeId) {
      followeeId
      followerId
      timestamp
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      content
      id
      owner
      timestamp
      type
    }
  }
`;

/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreate = /* GraphQL */ `
  subscription OnCreate($owner: String) {
    onCreate(owner: $owner) {
      content
      id
      owner
      timestamp
      type
    }
  }
`;
export const onCreateTimeline = /* GraphQL */ `
  subscription OnCreateTimeline($userId: ID!) {
    onCreateTimeline(userId: $userId) {
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
export const onDelete = /* GraphQL */ `
  subscription OnDelete($owner: String) {
    onDelete(owner: $owner) {
      content
      id
      owner
      timestamp
      type
    }
  }
`;

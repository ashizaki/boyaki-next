/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type FollowRelationshipInput = {
  followeeId: string,
};

export type FollowRelationship = {
  __typename: "FollowRelationship",
  followeeId: string,
  followerId: string,
  timestamp: number,
};

export type CreatePostInput = {
  content: string,
  id?: string | null,
};

export type Post = {
  __typename: "Post",
  content?: string | null,
  id: string,
  owner?: string | null,
  timestamp?: number | null,
  type?: string | null,
};

export type CreateTimelineInput = {
  postId: string,
  timestamp: number,
  userId: string,
};

export type Timeline = {
  __typename: "Timeline",
  post?: Post | null,
  timestamp: number,
  userId: string,
};

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type FollowRelationshipConnection = {
  __typename: "FollowRelationshipConnection",
  items:  Array<FollowRelationship >,
  nextToken?: string | null,
};

export type PostConnection = {
  __typename: "PostConnection",
  items:  Array<Post >,
  nextToken?: string | null,
};

export type TimelineConnection = {
  __typename: "TimelineConnection",
  items:  Array<Timeline | null >,
  nextToken?: string | null,
};

export type CreateFollowRelationshipMutationVariables = {
  input: FollowRelationshipInput,
};

export type CreateFollowRelationshipMutation = {
  createFollowRelationship?:  {
    __typename: "FollowRelationship",
    followeeId: string,
    followerId: string,
    timestamp: number,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    content?: string | null,
    id: string,
    owner?: string | null,
    timestamp?: number | null,
    type?: string | null,
  } | null,
};

export type CreateTimelineMutationVariables = {
  input?: CreateTimelineInput | null,
};

export type CreateTimelineMutation = {
  createTimeline?:  {
    __typename: "Timeline",
    post?:  {
      __typename: "Post",
      content?: string | null,
      id: string,
      owner?: string | null,
      timestamp?: number | null,
      type?: string | null,
    } | null,
    timestamp: number,
    userId: string,
  } | null,
};

export type DeleteFollowRelationshipMutationVariables = {
  followeeId: string,
};

export type DeleteFollowRelationshipMutation = {
  deleteFollowRelationship?:  {
    __typename: "FollowRelationship",
    followeeId: string,
    followerId: string,
    timestamp: number,
  } | null,
};

export type DeletePostMutationVariables = {
  id: string,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    content?: string | null,
    id: string,
    owner?: string | null,
    timestamp?: number | null,
    type?: string | null,
  } | null,
};

export type GetFollowRelationshipQueryVariables = {
  followeeId: string,
  followerId: string,
};

export type GetFollowRelationshipQuery = {
  getFollowRelationship?:  {
    __typename: "FollowRelationship",
    followeeId: string,
    followerId: string,
    timestamp: number,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    content?: string | null,
    id: string,
    owner?: string | null,
    timestamp?: number | null,
    type?: string | null,
  } | null,
};

export type ListFollowRelationshipsQueryVariables = {
  followeeId: string,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: SortDirection | null,
};

export type ListFollowRelationshipsQuery = {
  listFollowRelationships?:  {
    __typename: "FollowRelationshipConnection",
    items:  Array< {
      __typename: "FollowRelationship",
      followeeId: string,
      followerId: string,
      timestamp: number,
    } >,
    nextToken?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
  owner?: string | null,
  sortDirection?: SortDirection | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "PostConnection",
    items:  Array< {
      __typename: "Post",
      content?: string | null,
      id: string,
      owner?: string | null,
      timestamp?: number | null,
      type?: string | null,
    } >,
    nextToken?: string | null,
  } | null,
};

export type ListTimelinesQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTimelinesQuery = {
  listTimelines?:  {
    __typename: "TimelineConnection",
    items:  Array< {
      __typename: "Timeline",
      post?:  {
        __typename: "Post",
        content?: string | null,
        id: string,
        owner?: string | null,
        timestamp?: number | null,
        type?: string | null,
      } | null,
      timestamp: number,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSubscription = {
  onCreate?:  {
    __typename: "Post",
    content?: string | null,
    id: string,
    owner?: string | null,
    timestamp?: number | null,
    type?: string | null,
  } | null,
};

export type OnCreateTimelineSubscriptionVariables = {
  userId: string,
};

export type OnCreateTimelineSubscription = {
  onCreateTimeline?:  {
    __typename: "Timeline",
    post?:  {
      __typename: "Post",
      content?: string | null,
      id: string,
      owner?: string | null,
      timestamp?: number | null,
      type?: string | null,
    } | null,
    timestamp: number,
    userId: string,
  } | null,
};

export type OnDeleteSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSubscription = {
  onDelete?:  {
    __typename: "Post",
    content?: string | null,
    id: string,
    owner?: string | null,
    timestamp?: number | null,
    type?: string | null,
  } | null,
};

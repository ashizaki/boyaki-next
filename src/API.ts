/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  content: string,
  id?: string | null,
};

export type Post = {
  __typename: "Post",
  content?: string | null,
  id: string,
  owner?: string | null,
  ownerName?: string | null,
  timestamp?: number | null,
  type?: string | null,
};

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type PostConnection = {
  __typename: "PostConnection",
  items:  Array<Post >,
  nextToken?: string | null,
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
    ownerName?: string | null,
    timestamp?: number | null,
    type?: string | null,
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
    ownerName?: string | null,
    timestamp?: number | null,
    type?: string | null,
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
    ownerName?: string | null,
    timestamp?: number | null,
    type?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  id?: string | null,
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
      ownerName?: string | null,
      timestamp?: number | null,
      type?: string | null,
    } >,
    nextToken?: string | null,
  } | null,
};

export type OnUpdateSubscription = {
  onUpdate?:  {
    __typename: "Post",
    content?: string | null,
    id: string,
    owner?: string | null,
    ownerName?: string | null,
    timestamp?: number | null,
    type?: string | null,
  } | null,
};

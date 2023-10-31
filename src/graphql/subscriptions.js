/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const newOnCreateTodo = /* GraphQL */ `
  subscription NewOnCreateTodo {
    newOnCreateTodo {
      id
      name
      description
      image
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCandidate = /* GraphQL */ `
  subscription OnCreateCandidate(
    $filter: ModelSubscriptionCandidateFilterInput
  ) {
    onCreateCandidate(filter: $filter) {
      id
      name
      email
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCandidate = /* GraphQL */ `
  subscription OnUpdateCandidate(
    $filter: ModelSubscriptionCandidateFilterInput
  ) {
    onUpdateCandidate(filter: $filter) {
      id
      name
      email
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCandidate = /* GraphQL */ `
  subscription OnDeleteCandidate(
    $filter: ModelSubscriptionCandidateFilterInput
  ) {
    onDeleteCandidate(filter: $filter) {
      id
      name
      email
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLikes = /* GraphQL */ `
  subscription OnCreateLikes($filter: ModelSubscriptionLikesFilterInput) {
    onCreateLikes(filter: $filter) {
      id
      userName
      todoID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLikes = /* GraphQL */ `
  subscription OnUpdateLikes($filter: ModelSubscriptionLikesFilterInput) {
    onUpdateLikes(filter: $filter) {
      id
      userName
      todoID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLikes = /* GraphQL */ `
  subscription OnDeleteLikes($filter: ModelSubscriptionLikesFilterInput) {
    onDeleteLikes(filter: $filter) {
      id
      userName
      todoID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onCreateComments(filter: $filter) {
      id
      todoID
      description
      todo {
        id
        name
        description
        image
        category
        createdAt
        updatedAt
        __typename
      }
      userName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
      id
      todoID
      description
      todo {
        id
        name
        description
        image
        category
        createdAt
        updatedAt
        __typename
      }
      userName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
      id
      todoID
      description
      todo {
        id
        name
        description
        image
        category
        createdAt
        updatedAt
        __typename
      }
      userName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      image
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      image
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      image
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateModuleOne = /* GraphQL */ `
  subscription OnCreateModuleOne(
    $filter: ModelSubscriptionModuleOneFilterInput
  ) {
    onCreateModuleOne(filter: $filter) {
      id
      reference
      paymentId
      paymentMethod
      currency
      transactionId
      status
      statusMessage
      createDate
      endDate
      userName
      userEmail
      userPoolId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateModuleOne = /* GraphQL */ `
  subscription OnUpdateModuleOne(
    $filter: ModelSubscriptionModuleOneFilterInput
  ) {
    onUpdateModuleOne(filter: $filter) {
      id
      reference
      paymentId
      paymentMethod
      currency
      transactionId
      status
      statusMessage
      createDate
      endDate
      userName
      userEmail
      userPoolId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteModuleOne = /* GraphQL */ `
  subscription OnDeleteModuleOne(
    $filter: ModelSubscriptionModuleOneFilterInput
  ) {
    onDeleteModuleOne(filter: $filter) {
      id
      reference
      paymentId
      paymentMethod
      currency
      transactionId
      status
      statusMessage
      createDate
      endDate
      userName
      userEmail
      userPoolId
      createdAt
      updatedAt
      __typename
    }
  }
`;

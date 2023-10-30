/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCandidate = /* GraphQL */ `
  query GetCandidate($id: ID!) {
    getCandidate(id: $id) {
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
export const listCandidates = /* GraphQL */ `
  query ListCandidates(
    $filter: ModelCandidateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCandidates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        message
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLikes = /* GraphQL */ `
  query GetLikes($id: ID!) {
    getLikes(id: $id) {
      id
      userName
      todoID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        todoID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const likesByTodoID = /* GraphQL */ `
  query LikesByTodoID(
    $todoID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLikesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesByTodoID(
      todoID: $todoID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userName
        todoID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        todoID
        description
        userName
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByTodoID = /* GraphQL */ `
  query CommentsByTodoID(
    $todoID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByTodoID(
      todoID: $todoID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        todoID
        description
        userName
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      image
      Comments {
        items {
          description
          id
          userName
          createdAt
        }
      }
      Likes {
        items {
          createdAt
          id
          userName
        }
      }
      category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        category
        createdAt
        updatedAt
        Comments {
          items {
            description
            id
            userName
            createdAt
          }
        }
        Likes {
          items {
            createdAt
            id
            userName
          }
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getModuleOne = /* GraphQL */ `
  query GetModuleOne($id: ID!) {
    getModuleOne(id: $id) {
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
export const listModuleOnes = /* GraphQL */ `
  query ListModuleOnes(
    $filter: ModelModuleOneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModuleOnes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      transactionId
      checksum
      amountInCents
      reference
      customerEmail
      currency
      paymentMethodType
      redirectUrl
      status
      event
      environment
      timestamp
      sentAt
      ownCheckSum
      checksumParams
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        transactionId
        checksum
        amountInCents
        reference
        customerEmail
        currency
        paymentMethodType
        redirectUrl
        status
        event
        environment
        timestamp
        sentAt
        ownCheckSum
        checksumParams
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

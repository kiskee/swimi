/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCandidate = /* GraphQL */ `
  mutation CreateCandidate(
    $input: CreateCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    createCandidate(input: $input, condition: $condition) {
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
export const updateCandidate = /* GraphQL */ `
  mutation UpdateCandidate(
    $input: UpdateCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    updateCandidate(input: $input, condition: $condition) {
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
export const deleteCandidate = /* GraphQL */ `
  mutation DeleteCandidate(
    $input: DeleteCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    deleteCandidate(input: $input, condition: $condition) {
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
export const createLikes = /* GraphQL */ `
  mutation CreateLikes(
    $input: CreateLikesInput!
    $condition: ModelLikesConditionInput
  ) {
    createLikes(input: $input, condition: $condition) {
      id
      userName
      todoID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLikes = /* GraphQL */ `
  mutation UpdateLikes(
    $input: UpdateLikesInput!
    $condition: ModelLikesConditionInput
  ) {
    updateLikes(input: $input, condition: $condition) {
      id
      userName
      todoID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLikes = /* GraphQL */ `
  mutation DeleteLikes(
    $input: DeleteLikesInput!
    $condition: ModelLikesConditionInput
  ) {
    deleteLikes(input: $input, condition: $condition) {
      id
      userName
      todoID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createComments = /* GraphQL */ `
  mutation CreateComments(
    $input: CreateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    createComments(input: $input, condition: $condition) {
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
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
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
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createModuleOne = /* GraphQL */ `
  mutation CreateModuleOne(
    $input: CreateModuleOneInput!
    $condition: ModelModuleOneConditionInput
  ) {
    createModuleOne(input: $input, condition: $condition) {
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
      Transactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateModuleOne = /* GraphQL */ `
  mutation UpdateModuleOne(
    $input: UpdateModuleOneInput!
    $condition: ModelModuleOneConditionInput
  ) {
    updateModuleOne(input: $input, condition: $condition) {
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
      Transactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteModuleOne = /* GraphQL */ `
  mutation DeleteModuleOne(
    $input: DeleteModuleOneInput!
    $condition: ModelModuleOneConditionInput
  ) {
    deleteModuleOne(input: $input, condition: $condition) {
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
      Transactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
      modelID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
      modelID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
      modelID
      createdAt
      updatedAt
      __typename
    }
  }
`;

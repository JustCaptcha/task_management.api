For API usage look over `./src/schema.gql` file. 

```gql
type Query {
  tasks: [Task!]!
  getTask(id: Int!): Task!
  users: [User!]!
  user(id: Int!): User!
}

type Mutation {
  updateTask(updateTaskInput: UpdateTaskInput!): Task!
  createTask(createTaskInput: CreateTaskInput!): Task!
  createUser(createUserInput: CreateUserInput!): User!
  updateUser(updateUserInput: UpdateUserInput!): User!
  removeUser(id: Int!): User!
  assignTaskToUser(assignTaskToUserInput: AssignTaskInput!): User!
}
```

## App flow

1. Create an new user
```ts
mutation Mutation($createUserCreateUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserCreateUserInput) {
    id
    name
    created_at
    taskId
    prevTaskId
    activeTask {
      ...Task
    }
  } 
  createTask(createTaskInput: $createTaskCreateTaskInput) {
    id
    name
    description
    status
    created_at
    updated_at
    started_at
    stopped_at
    finished_at
    trackedTime
    userId
    assignedUser {
      
    }
    getUser {
      
    }
  }
}
```
2. Create tasks
```ts
mutation Mutation($createUserCreateUserInput: CreateUserInput!) {
  createTask(createTaskInput: $createTaskCreateTaskInput) {
    id
    name
    description
    status
    created_at
    updated_at
    started_at
    stopped_at
    finished_at
    trackedTime
    userId
    assignedUser {
      ...User
    }
}

```
3. Assign new task to a user
```ts
  assignTaskToUser(assignTaskToUserInput: $assignTaskToUserAssignTaskToUserInput) {
    id
    name
    created_at
    taskId
    prevTaskId
    activeTask {
        ...Task
    }
  }
```
4. Stop an active task from a user
```ts
mutation StopActiveTaskMutation($stopActiveTaskId: Int!) {
  stopActiveTask(id: $stopActiveTaskId) {
    id
    name
    created_at
    taskId
    prevTaskId
    activeTask {
        ...Task
    }
  }
}
```

## Tables
Task
```ts
  Task {
    id
    name
    description
    status
    created_at
    updated_at
    started_at
    stopped_at
    finished_at
    trackedTime
    userId
    assignedUser: User
  }

  User {
    id
    name
    created_at
    taskId
    prevTaskId
    activeTask: Task
  }
```

## Other

For other API usage, please open [APOLLO_PLAYGROUND](https://studio.apollographql.com/sandbox/explorer), try it out it's awesome!
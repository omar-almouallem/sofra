export class SofraError extends Error {}

export class UserAlreadyExistsError extends SofraError {
  constructor () {
    super('User already exists');
  }
}

export class UserDoesNotExistError extends SofraError {
  constructor () {
    SofraError;
    super('User does not exist');
  }
}

export class InvalidPasswordError extends SofraError {
  constructor () {
    super('Invalid password');
  }
}
export class BasicLoginFailed extends SofraError {
  constructor () {
    super('Basic login failed');
  }
}

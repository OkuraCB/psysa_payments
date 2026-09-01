export class UserDeleteError extends Error {
  constructor() {
    super("Error when deleting user's account");
  }
}

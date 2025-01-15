export class LateCheckInValidationError extends Error {
  constructor() {
    super('check-in exceeded the time limit allowed to be validated')
  }
}

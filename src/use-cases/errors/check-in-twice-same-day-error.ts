export class CheckInTwiceInTheSameDayError extends Error {
  constructor() {
    super('You cant check in twice in the same day.')
  }
}

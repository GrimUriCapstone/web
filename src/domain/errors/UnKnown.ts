export class UnKnown extends Error {
  constructor(message: string) {
    super("UnKnown : " + message);
  }
}

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
  ) {}
}

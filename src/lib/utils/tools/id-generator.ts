export class IdGenerator {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  get getId(): number {
    this.id += 1;
    return this.id;
  }
}

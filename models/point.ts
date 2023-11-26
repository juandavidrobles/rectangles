export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getVectorWithPoint({ x, y }: Point): Point {
    return new Point(x - this.x, y - this.y);
  }

  getPerpendicularVector(): Point {
    return new Point(this.y * -1, this.x);
  }

  dotProduct({ x, y }: Point): number {
    return this.x * x + this.y * y;
  }

  isSamePoint({ x, y }: Point): boolean {
    return x === this.x && y === this.y;
  }
}

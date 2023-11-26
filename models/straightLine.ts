import { Point } from "./point";

export class StraightLine {
  pointA: Point;
  pointB: Point;

  slope: number;
  yIntercept: number;

  constructor(pointA: Point, pointB: Point) {
    this.pointA = pointA;
    this.pointB = pointB;

    this.slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);
    this.yIntercept = pointA.y - this.slope * pointA.x;
  }

  hasPointOnTheLine({ x, y }: Point): boolean {
    // For vertical lines, the slope is inifite. In those cases we check only
    // the x-coordinates
    if (Math.abs(this.slope) == Infinity) {
      return x === this.pointA.x;
    }
    return y === this.slope * x - this.slope * this.pointA.x + this.pointA.y;
  }

  isParalelWith(line: StraightLine): boolean {
    return Math.abs(this.slope) === Math.abs(line.slope);
  }

  findIntersectionWith(line: StraightLine): Point | undefined {
    if (this.isParalelWith(line)) {
      return undefined;
    }
    const { slope: m1, yIntercept: c1 } = this;
    const { slope: m2, yIntercept: c2 } = line;
    const x = (c2 - c1) / (m1 - m2);
    const y = m2 * x + c2;
    return new Point(x, y);
  }

  isVertical(): boolean {
    return this.pointA.x === this.pointB.x;
  }
}

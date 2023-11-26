import { Point } from "./point";
import { StraightLine } from "./straightLine";

export class LineSegment extends StraightLine {
  hasPointOnTheLineSegment(point: Point): boolean {
    const { x, y } = point;
    const minX = Math.min(...[x, this.pointA.x, this.pointB.x]);
    const maxX = Math.max(...[x, this.pointA.x, this.pointB.x]);
    const minY = Math.min(...[y, this.pointA.y, this.pointB.y]);
    const maxY = Math.max(...[y, this.pointA.y, this.pointB.y]);
    return (
      super.hasPointOnTheLine(point) &&
      [this.pointA.x, this.pointB.x].includes(minX) &&
      [this.pointA.x, this.pointB.x].includes(maxX) &&
      [this.pointA.y, this.pointB.y].includes(minY) &&
      [this.pointA.y, this.pointB.y].includes(maxY)
    );
  }

  findIntersectionWith(line: LineSegment): Point | undefined {
    if (this.isParallelWith(line)) {
      return undefined;
    }

    // Special case: Any of the lines is vertical
    if (this.isVertical() || line.isVertical()) {
      const verticalLine = this.isVertical() ? this : line;
      const otherLine = this.isVertical() ? line : this;

      const x = verticalLine.pointA.x;

      const y = otherLine.slope * x + otherLine.yIntercept;

      const intersectionPoint = new Point(x, y);

      return this.hasPointOnTheLineSegment(intersectionPoint) &&
        line.hasPointOnTheLineSegment(intersectionPoint)
        ? intersectionPoint
        : undefined;
    }

    const { slope: m2, yIntercept: c2 } = line;
    const { slope: m1, yIntercept: c1 } = this;
    const x = (c2 - c1) / (m1 - m2);
    const y = m2 * x + c2;
    const intersectionPoint = new Point(x, y);
    return this.hasPointOnTheLineSegment(intersectionPoint)
      ? intersectionPoint
      : undefined;
  }

  isAdjacentWith(segment: LineSegment) {
    return (
      this.isParallelWith(segment) &&
      (this.hasPointOnTheLineSegment(segment.pointA) ||
        this.hasPointOnTheLineSegment(segment.pointB) ||
        segment.hasPointOnTheLineSegment(this.pointA) ||
        segment.hasPointOnTheLineSegment(this.pointB))
    );
  }
}

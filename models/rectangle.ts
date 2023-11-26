import { AdjacencyType } from "../enums";
import { LineSegment } from "./lineSegment";
import { Point } from "./point";

export class Rectangle {
  vertices: Point[];
  edges: LineSegment[];

  constructor(vertices: Point[]) {
    this.vertices = vertices;
    this.edges = this.getLines(vertices);
  }

  private getLines([p1, p2, p3, p4]: Point[]) {
    return [
      new LineSegment(p1, p2),
      new LineSegment(p2, p3),
      new LineSegment(p3, p4),
      new LineSegment(p4, p1),
    ];
  }

  doesContainPoint(point: Point): boolean {
    const [p1, p2, p3, p4] = this.vertices;
    // Vectors from each vertex to the next one
    const v1 = p1.getVectorWithPoint(p2);
    const v2 = p2.getVectorWithPoint(p3);
    const v3 = p3.getVectorWithPoint(p4);
    const v4 = p4.getVectorWithPoint(p1);

    // Perpendicular vectors to each previous calculated
    const perpendicularV1 = v1.getPerpendicularVector();
    const perpendicularV2 = v2.getPerpendicularVector();
    const perpendicularV3 = v3.getPerpendicularVector();
    const perpendicularV4 = v4.getPerpendicularVector();

    // Vector from vertex to the point
    const v1ToPointVector = p1.getVectorWithPoint(point);
    const v2ToPointVector = p2.getVectorWithPoint(point);
    const v3ToPointVector = p3.getVectorWithPoint(point);
    const v4ToPointVector = p4.getVectorWithPoint(point);

    // Dot products between each vertex-to-point vector and vertex-perpendicular ones
    const dotProducts = [
      v1ToPointVector.dotProduct(perpendicularV1),
      v2ToPointVector.dotProduct(perpendicularV2),
      v3ToPointVector.dotProduct(perpendicularV3),
      v4ToPointVector.dotProduct(perpendicularV4),
    ];

    // All the dotProducts should have same sign or be 0
    return (
      dotProducts.every((value) => value >= 0) ||
      dotProducts.every((value) => value <= 0)
    );
  }

  doesContainRectangle(rectangle: Rectangle): boolean {
    return rectangle.vertices.every((vertex) => this.doesContainPoint(vertex));
  }

  isContainedBy(rectangle: Rectangle): boolean {
    return rectangle.doesContainRectangle(this);
  }

  hasIntersectionWith(rectangle: Rectangle) {
    for (const ownSegment of this.edges) {
      for (const externalSegment of rectangle.edges) {
        if (ownSegment.findIntersectionWith(externalSegment)) {
          return true;
        }
      }
    }
    return false;
  }

  findIntersectionsWith(rectangle: Rectangle): Point[] {
    const intersections: Point[] = [];
    for (const ownSegment of this.edges) {
      for (const externalSegment of rectangle.edges) {
        const intersection = ownSegment.findIntersectionWith(externalSegment);
        if (
          intersection &&
          !intersections.find((item) => item.isSamePoint(intersection))
        ) {
          intersections.push(intersection);
        }
      }
    }
    return intersections;
  }

  isAdjacentTo(rectangle: Rectangle): boolean {
    if (this.isContainedBy(rectangle) || this.doesContainRectangle(rectangle)) {
      return false;
    }
    for (const ownSegment of this.edges) {
      for (const externalSegment of rectangle.edges) {
        if (ownSegment.isAdjacentWith(externalSegment)) {
          return true;
        }
      }
    }
    return false;
  }

  getAdjacencyTypeWith(rectangle: Rectangle): AdjacencyType {
    if (this.isContainedBy(rectangle) || this.doesContainRectangle(rectangle)) {
      return AdjacencyType.NOT_ADJACENT;
    }
    let isThereAnySubline = false;
    let isThereAnyPartial = false;
    for (const ownSegment of this.edges) {
      for (const externalSegment of rectangle.edges) {
        if (ownSegment.isAdjacentWith(externalSegment)) {
          if (
            (ownSegment.pointA.isSamePoint(externalSegment.pointA) &&
              ownSegment.pointB.isSamePoint(externalSegment.pointB)) ||
            (ownSegment.pointA.isSamePoint(externalSegment.pointB) &&
              ownSegment.pointB.isSamePoint(externalSegment.pointA))
          ) {
            return AdjacencyType.PROPER;
          } else if (
            (ownSegment.hasPointOnTheLineSegment(externalSegment.pointA) &&
              ownSegment.hasPointOnTheLineSegment(externalSegment.pointB)) ||
            (externalSegment.hasPointOnTheLineSegment(ownSegment.pointA) &&
              externalSegment.hasPointOnTheLineSegment(ownSegment.pointB))
          ) {
            isThereAnySubline = true;
          } else {
            isThereAnyPartial = true;
          }
        }
      }
    }
    if (isThereAnySubline) {
      return AdjacencyType.SUBLINE;
    }
    if (isThereAnyPartial) {
      return AdjacencyType.PARTIAL;
    }
    return AdjacencyType.NOT_ADJACENT;
  }
}

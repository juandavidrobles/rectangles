import { Point, Rectangle } from "../models";

describe("Intersection cases", () => {
  it("checks intersection", () => {
    const r1 = new Rectangle([
      new Point(3, 1),
      new Point(6, 1),
      new Point(6, 4.5),
      new Point(3, 4.5),
    ]);
    const r2 = new Rectangle([
      new Point(7, 3),
      new Point(8, 4),
      new Point(7, 6),
      new Point(5, 4),
    ]);
    expect(r1.hasIntersectionWith(r2)).toBe(true);
    expect(r2.hasIntersectionWith(r1)).toBe(true);
  });

  it("checks rectangles with 2 intersections", () => {
    const r1 = new Rectangle([
      new Point(2, 1),
      new Point(6, 1),
      new Point(6, 3),
      new Point(2, 3),
    ]);
    const r2 = new Rectangle([
      new Point(3, 2),
      new Point(5, 2),
      new Point(5, 4),
      new Point(3, 4),
    ]);
    expect(r1.hasIntersectionWith(r2)).toBe(true);
    expect(r2.hasIntersectionWith(r1)).toBe(true);
    const intersections = r1.findIntersectionsWith(r2);
    expect(intersections).toHaveLength(2);
    expect(intersections.some((p) => p.isSamePoint(new Point(3, 3)))).toBe(
      true
    );
    expect(intersections.some((p) => p.isSamePoint(new Point(5, 3)))).toBe(
      true
    );
  });

  it("checks Rectangle Partially Inside Another", () => {
    const r1 = new Rectangle([
      new Point(2, 2),
      new Point(5, 2),
      new Point(5, 4),
      new Point(2, 4),
    ]);
    const r2 = new Rectangle([
      new Point(1, 1),
      new Point(4, 1),
      new Point(4, 3),
      new Point(1, 3),
    ]);
    const intersections = r1.findIntersectionsWith(r2);
    expect(r1.hasIntersectionWith(r2)).toBe(true);
    expect(intersections).toHaveLength(2);
  });

  it("checks Rectangles with No Intersection", () => {
    const r1 = new Rectangle([
      new Point(1, 1),
      new Point(3, 1),
      new Point(3, 3),
      new Point(1, 3),
    ]);
    const r2 = new Rectangle([
      new Point(4, 4),
      new Point(6, 4),
      new Point(6, 6),
      new Point(4, 6),
    ]);
    const intersections = r1.findIntersectionsWith(r2);
    expect(r1.hasIntersectionWith(r2)).toBe(false);
    expect(intersections).toHaveLength(0);
  });

  it("checks Rectangles Touching at a Corner", () => {
    const r1 = new Rectangle([
      new Point(1, 1),
      new Point(3, 1),
      new Point(3, 3),
      new Point(1, 3),
    ]);
    const r2 = new Rectangle([
      new Point(3, 3),
      new Point(5, 3),
      new Point(5, 5),
      new Point(3, 5),
    ]);
    expect(r1.hasIntersectionWith(r2)).toBe(true);
    expect(r1.findIntersectionsWith(r2)).toHaveLength(1);
  });

  it("checks Rectangles Overlapping Partially", () => {
    const r1 = new Rectangle([
      new Point(1, 1),
      new Point(4, 1),
      new Point(4, 3),
      new Point(1, 3),
    ]);
    const r2 = new Rectangle([
      new Point(3, 2),
      new Point(6, 2),
      new Point(6, 4),
      new Point(3, 4),
    ]);
    expect(r1.hasIntersectionWith(r2)).toBe(true);
    expect(r1.findIntersectionsWith(r2)).toHaveLength(2);
  });
});

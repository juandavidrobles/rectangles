import { Point, Rectangle } from "../models";

describe("Containment cases", () => {
  it("checks containment case", () => {
    const r1 = new Rectangle([
      new Point(3, 1),
      new Point(11, 1),
      new Point(11, 6),
      new Point(3, 6),
    ]);
    const r2 = new Rectangle([
      new Point(5, 4),
      new Point(8, 4),
      new Point(8, 5),
      new Point(5, 5),
    ]);
    expect(r1.doesContainRectangle(r2)).toBe(true);
    expect(r2.isContainedBy(r1)).toBe(true);
  });

  it("checks Rectangle Completely Inside Another", () => {
    const r1 = new Rectangle([
      new Point(2, 2),
      new Point(3, 2),
      new Point(3, 3),
      new Point(2, 3),
    ]);
    const r2 = new Rectangle([
      new Point(1, 1),
      new Point(4, 1),
      new Point(4, 4),
      new Point(1, 4),
    ]);
    expect(r2.doesContainRectangle(r1)).toBe(true);
    expect(r1.hasIntersectionWith(r2)).toBe(false);
  });

  it("checks Rectangles with One Inside the Other, but No Intersection", () => {
    const r1 = new Rectangle([
      new Point(2, 2),
      new Point(3, 2),
      new Point(3, 3),
      new Point(2, 3),
    ]);
    const r2 = new Rectangle([
      new Point(1, 1),
      new Point(4, 1),
      new Point(4, 4),
      new Point(1, 4),
    ]);
    expect(r2.doesContainRectangle(r1)).toBe(true);
    expect(r1.hasIntersectionWith(r2)).toBe(false);
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
    expect(r1.doesContainRectangle(r2)).toBe(false);
    expect(r1.isContainedBy(r2)).toBe(false);
  });

  it("checks Edge case: Containment with subline adjacency", () => {
    const r1 = new Rectangle([
      new Point(4, 2),
      new Point(10, 2),
      new Point(10, 6),
      new Point(4, 6),
    ]);
    const r2 = new Rectangle([
      new Point(6, 4),
      new Point(8, 4),
      new Point(8, 6),
      new Point(6, 6),
    ]);
    expect(r1.doesContainRectangle(r2)).toBe(true);
    expect(r1.isContainedBy(r2)).toBe(false);
  });

  it("checks Edge case: Rectangles Identical", () => {
    const r1 = new Rectangle([
      new Point(1, 1),
      new Point(3, 1),
      new Point(3, 3),
      new Point(1, 3),
    ]);
    const r2 = new Rectangle([
      new Point(1, 1),
      new Point(3, 1),
      new Point(3, 3),
      new Point(1, 3),
    ]);
    expect(r1.doesContainRectangle(r2)).toBe(true);
    expect(r1.isContainedBy(r2)).toBe(true);
  });
});

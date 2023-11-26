import { AdjacencyType } from "../enums";
import { Point, Rectangle } from "../models";

describe("Jest check", () => {
  it("checks 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

describe("Adjacency cases", () => {
  it("checks subline adjacency", () => {
    const r1 = new Rectangle([
      new Point(3, 1),
      new Point(5, 1),
      new Point(5, 4),
      new Point(3, 4),
    ]);
    const r2 = new Rectangle([
      new Point(5, 2),
      new Point(7, 2),
      new Point(7, 3),
      new Point(5, 3),
    ]);

    expect(r1.isAdjacentTo(r2)).toBe(true);
    expect(r1.getAdjacencyTypeWith(r2)).toBe(AdjacencyType.SUBLINE);
  });

  it("checks Rectangles Sharing a Full Side (Proper Side Sharing)", () => {
    const r1 = new Rectangle([
      new Point(1, 1),
      new Point(4, 1),
      new Point(4, 3),
      new Point(1, 3),
    ]);
    const r2 = new Rectangle([
      new Point(4, 1),
      new Point(6, 1),
      new Point(6, 3),
      new Point(4, 3),
    ]);
    expect(r1.getAdjacencyTypeWith(r2)).toBe(AdjacencyType.PROPER);
  });

  it("checks Rectangles Sharing an Edge Completely", () => {
    const r1 = new Rectangle([
      new Point(1, 1),
      new Point(4, 1),
      new Point(4, 3),
      new Point(1, 3),
    ]);
    const r2 = new Rectangle([
      new Point(1, 3),
      new Point(4, 3),
      new Point(4, 5),
      new Point(1, 5),
    ]);
    expect(r1.getAdjacencyTypeWith(r2)).toBe(AdjacencyType.PROPER);
  });

  it("checks Edge case: Adjacency partial", () => {
    const r1 = new Rectangle([
      new Point(6, 1),
      new Point(10, 1),
      new Point(10, 4),
      new Point(6, 4),
    ]);
    const r2 = new Rectangle([
      new Point(2, 3),
      new Point(6, 3),
      new Point(6, 5),
      new Point(2, 5),
    ]);
    expect(r1.getAdjacencyTypeWith(r2)).toBe(AdjacencyType.PARTIAL);
  });

  it("checks Edge case: Straight lines adjacencents but not segment adjacency", () => {
    const r1 = new Rectangle([
      new Point(3, 1),
      new Point(6, 1),
      new Point(6, 2),
      new Point(3, 2),
    ]);
    const r2 = new Rectangle([
      new Point(6, 5),
      new Point(9, 5),
      new Point(9, 8),
      new Point(6, 8),
    ]);
    expect(r1.isAdjacentTo(r2)).toBe(false);
    expect(r1.getAdjacencyTypeWith(r2)).toBe(AdjacencyType.NOT_ADJACENT);
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
    expect(r1.isAdjacentTo(r2)).toBe(false);
    expect(r1.getAdjacencyTypeWith(r2)).toBe(AdjacencyType.NOT_ADJACENT);
  });
});

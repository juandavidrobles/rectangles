import { Point, Rectangle } from "./models";

// Rectangles Identical:
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

console.log("Adjacent: ", r1.isAdjacentTo(r2));
console.log("Adjacency type: ", r1.getAdjacencyTypeWith(r2));
console.log("Intersection: ", r1.hasIntersectionWith(r2));
console.log(
  "Intersection points: ",
  r1
    .findIntersectionsWith(r2)
    .map(({ x, y }) => `(${x},${y})`)
    .join(" ")
);
console.log(
  "Contains: ",
  r1.doesContainRectangle(r2) || r2.doesContainRectangle(r1)
);

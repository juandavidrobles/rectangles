import { Point, Rectangle } from "./models";

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

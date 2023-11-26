# Rectangles

## Description

These project contains a rectangle entity that is based in other entities to perform 3 operations between rectangles.

We can check with this entity if:

- This rectangle has any intersection Point with other rectangles and find those intersection Points

- This rectangle is contained by or contains another rectangle

- This rectangle is adjacent to another rectangle and find the type of adjacency between them

## Entities

### Rectangle

This is the entity that represents the rectangles and allow us to perform the 3 described operations above.

To represent rectangles and simplify operations between them, each rectangle has four Points representing its vertices on the plane, and four Line Segments representing its edges.

### Point

This entity represents a Point on the plane. It has two components: x and y coordinates. This entity is useful to perform some geometric operations between Points like:

- Get the vector between two Points
- Considering a Point as a position-vector we can calculate the dot product with another Point considered as a position-vector
- Check if two Points are the same by comparing their x and y coordinates
- Considering the Point as a position-vector, find the vector perpendicular to it

### Line Segment

This entity is used to represent a subsection of a Straight Line on the plane. It's useful to:

- Check if a Point lies on the segment
- Find the intersection with another Line Segment if any
- Find if there's any adjacency/overlapping between two segments

This entity extends `Straight Line` entity.

### Straight Line

This entity represents a Straight Line on the plane and It is defined by two points on the line and characterized by its slope and y-intercept.

This entity is useful to:

- Check if a given Point lies on the line
- Check if the line is parallel to another one
- Find the intersection with another line if any
- Check if a line is vertical what is an edge case where the slope is infinite.

## Tests

There's a `./tests` folder that contains unit tests for each type of operation including some of the following test cases:

- Checking partial adjacency between 2 rectangles
- Checking adjacency of two rectangles whose the Straight Lines associated to any of their edges are the same line but their segments doesn't overlap
- Checking adjacency of two identical rectangles
- Checking containment of two overlapping rectangles
- Checking containment with subline adjacency
- Checking containment of identical rectangles
- Checking intersection of a rectangle partially inside another
- Checking intersection of rectangles touching a corner

There are 3 files with unit tests, one of them for testing the adjacency operation, another one for testing the containment and another for testing the intersection operation.

- `adjacency.test.ts`
- `containment.test.ts`
- `intersection.test.ts`

## Requirements to run

- Node 18+

## How to run

- Install the dependencies with npm

```bash
npm i
```

- Run tests with jest

```bash
npm run test
```

export default class Point {
  constructor(public x: number, public y: number, public wall: boolean) {}
  f = 0;
  g = 0;
  h = 0;
  prev: Point | null = null;
  equals(otherPoint: Point): boolean {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }
  getNeighbors(grid: Point[][]): Point[] {
    const neighbours: Point[] = [];
    const { x, y } = this;
    // Top
    neighbours.push((grid[y] || [])[x - 1]);
    // Bottom
    neighbours.push((grid[y] || [])[x + 1]);
    // Left
    neighbours.push((grid[y - 1] || [])[x]);
    // Right
    neighbours.push((grid[y + 1] || [])[x]);

    return neighbours.filter((n) => !!n);
  }
}

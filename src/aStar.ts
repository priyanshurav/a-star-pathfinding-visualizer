import Point from './Point';
import getElement from './getElement';
import reset from './reset';

const delay = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default async function (
  grid: Point[][],
  start: Point,
  dest: Point
): Promise<void> {
  const closedSet: Point[] = [];
  const openSet: Point[] = [];
  let isStopped = false;
  openSet.push(start);
  const handleForceStop = () => (isStopped = true);
  window.addEventListener('forcestop', handleForceStop);
  while (openSet.length > 0) {
    if (isStopped) {
      window.removeEventListener('forcestop', handleForceStop);
      return reset(grid, false);
    }
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++)
      if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i;
    const current = openSet[lowestIndex];
    if (current.equals(dest)) return traceBackPath(dest);
    remove(openSet, current);
    closedSet.push(current);
    const neighbors = current.getNeighbors(grid);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (closedSet.includes(neighbor) || neighbor.wall) continue;
      const tempG = current.g + 1;
      if (openSet.includes(neighbor)) {
        if (tempG < neighbor.g) neighbor.g = tempG;
      } else {
        neighbor.g = tempG;
        openSet.push(neighbor);
      }
      neighbor.h = heuristic(neighbor, dest);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.prev = current;
    }
    renderOpenAndClosedSet(openSet, closedSet);
    await delay(0);
  }
  return document
    .querySelector('.no-valid-path-found-text')
    ?.classList.remove('hide');
}

function remove(array: Point[], element: Point): void {
  const index = array.findIndex((p) => p.equals(element));
  array.splice(index, 1);
}

// Returns the Manhattan distance between the point and the destination
function heuristic(point: Point, dest: Point): number {
  return Math.abs(point.x - dest.x) + Math.abs(point.y - dest.y);
}

async function traceBackPath(dest: Point): Promise<void> {
  let tempPrev = dest.prev;
  while (tempPrev?.prev) {
    getElement(tempPrev).classList.add('path');
    await delay(5);
    tempPrev = tempPrev?.prev;
  }
}

function renderOpenAndClosedSet(openSet: Point[], closedSet: Point[]): void {
  openSet.forEach((point) => getElement(point).classList.add('open'));
  closedSet.forEach((point) => getElement(point).classList.add('close'));
}

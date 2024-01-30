import { COLS, ROWS } from './constants';
import Point from './Point';
import renderGrid from './renderGrid';
import setupEventListeners from './setupEventListeners';
import './styles/index.scss';

function main(): void {
  const grid: Point[][] = [];

  // Initialize the grid
  for (let i = 0; i < ROWS; i++) {
    const tempArr: Point[] = [];
    for (let j = 0; j < COLS; j++) tempArr.push(new Point(j, i, false));
    grid.push(tempArr);
  }

  window.start = grid[0][0];
  window.dest = grid[ROWS - 1][COLS - 1];
  renderGrid(grid);
  setupEventListeners(grid);
}

main();

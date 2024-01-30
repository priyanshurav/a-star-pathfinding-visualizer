import aStar from './aStar';
import clearVisualizations from './clearVisualizations';
import { COLS, ROWS } from './constants';
import getElement from './getElement';
import Point from './Point';
import renderGrid from './renderGrid';
import reset from './reset';

const startBtn = document.querySelector<HTMLButtonElement>('.start');
const randomWallsBtn = document.querySelector<HTMLButtonElement>(
  '.random-walls'
);
const resetBtn = document.querySelector<HTMLButtonElement>('.reset');
const forceStopBtn = document.querySelector<HTMLButtonElement>('.force-stop');
const clearVisualizationsBtn = document.querySelector<HTMLButtonElement>(
  '.clear-visualizations'
);
const hardResetBtn = document.querySelector<HTMLButtonElement>('.hard-reset');

let isRunning = false;

function attachAddWallListeners(grid: Point[][]): void {
  for (const pointArr of grid)
    for (const point of pointArr) {
      getElement(point).onclick = (e) => {
        if (
          point.equals(window.start) ||
          point.equals(window.dest) ||
          isRunning
        )
          return;
        point.wall = !point.wall;
        (e.target as HTMLDivElement).classList.toggle('wall');
        clearVisualizations();
      };
    }
}

const normalizeX = (x: number): number => {
  if (x < 0) return 0;
  else if (x >= COLS) return COLS - 1;
  return x;
};
const normalizeY = (y: number): number => {
  if (y < 0) return 0;
  else if (y >= ROWS) return ROWS - 1;
  return y;
};

export default (grid: Point[][]): void => {
  resetBtn?.addEventListener('click', () => {
    if (!isRunning) reset(grid);
  });

  randomWallsBtn?.addEventListener('click', () => {
    if (isRunning) return;
    reset(grid);
    for (const pointArr of grid)
      for (const point of pointArr) {
        if (point.wall) continue;
        const isWall =
          Math.random() < 0.2 &&
          !point.equals(window.start) &&
          !point.equals(window.dest);
        point.wall = isWall;
        if (isWall) getElement(point).classList.add('wall');
      }
  });
  attachAddWallListeners(grid);
  const start = async () => {
    if (isRunning) return;
    document.querySelector('.no-valid-path-found-text')?.classList.add('hide');
    isRunning = true;
    renderGrid(grid);
    await aStar(grid, window.start, window.dest);
    isRunning = false;
    attachAddWallListeners(grid);
  };
  window.addEventListener('keydown', (e) => {
    if (isRunning) return;
    const SPACE = ' ';
    const key = e.key.toLowerCase();
    const { x: startX, y: startY } = window.start;
    const { x: destX, y: destY } = window.dest;
    getElement(window.start).classList.remove('start');
    getElement(window.dest).classList.remove('destination');
    if (key === SPACE) return start();
    clearVisualizations();
    switch (key) {
      case 'arrowup': {
        window.start = grid[normalizeY(startY - 1)][normalizeX(startX)];
        break;
      }
      case 'arrowdown': {
        window.start = grid[normalizeY(startY + 1)][normalizeX(startX)];
        break;
      }
      case 'arrowleft': {
        window.start = grid[normalizeY(startY)][normalizeX(startX - 1)];
        break;
      }
      case 'arrowright': {
        window.start = grid[normalizeY(startY)][normalizeX(startX + 1)];
        break;
      }
      case 'w': {
        window.dest = grid[normalizeY(destY - 1)][normalizeX(destX)];
        break;
      }
      case 's': {
        window.dest = grid[normalizeY(destY + 1)][normalizeX(destX)];
        break;
      }
      case 'a': {
        window.dest = grid[normalizeY(destY)][normalizeX(destX - 1)];
        break;
      }
      case 'd': {
        window.dest = grid[normalizeY(destY)][normalizeX(destX + 1)];
        break;
      }
    }

    if (window.dest.equals(window.start))
      window.dest = grid[normalizeY(destY - 1)][normalizeX(destX)];
    if (window.start.equals(window.dest))
      window.start = grid[normalizeY(startY - 1)][normalizeX(startX)];

    getElement(window.start).classList.remove('wall');
    getElement(window.dest).classList.remove('wall');
    getElement(window.start).classList.add('start');
    getElement(window.dest).classList.add('destination');
    window.start.wall = false;
    window.dest.wall = false;
  });
  forceStopBtn?.addEventListener('click', () => {
    if (!isRunning) return;
    window.dispatchEvent(new Event('forcestop'));
  });
  clearVisualizationsBtn?.addEventListener('click', () => {
    if (!isRunning) clearVisualizations();
  });
  hardResetBtn?.addEventListener('click', () => {
    if (isRunning) return;
    reset(grid);
    getElement(window.start).classList.remove('start');
    getElement(window.dest).classList.remove('destination');
    window.start = grid[0][0];
    window.dest = grid[ROWS - 1][COLS - 1];
    getElement(window.start).classList.remove('wall');
    getElement(window.dest).classList.remove('wall');
    getElement(window.start).classList.add('start');
    getElement(window.dest).classList.add('destination');
    window.start.wall = false;
    window.dest.wall = false;
  });
  startBtn?.addEventListener('click', start);
};

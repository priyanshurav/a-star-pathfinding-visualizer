import Point from './Point';

const gridEl = document.querySelector('.grid') as HTMLDivElement;

export default function renderGrid(grid: Point[][]): void {
  gridEl.innerHTML = '';
  for (const pointArr of grid) {
    for (const point of pointArr) {
      const el = document.createElement('div');
      if (point.equals(window.start)) el.classList.add('start');
      else if (point.equals(window.dest)) el.classList.add('destination');
      else if (point.wall) el.classList.add('wall');
      el.dataset.x = point.x.toString();
      el.dataset.y = point.y.toString();
      gridEl.appendChild(el);
    }
  }
}

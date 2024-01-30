import Point from './Point';

export default function getElement(point: Point): HTMLDivElement {
  const el = document.querySelector<HTMLDivElement>(
    `[data-x="${point.x}"][data-y="${point.y}"]`
  ) as HTMLDivElement;
  return el;
}

import Point from '../Point';

declare global {
  interface Window {
    start: Point;
    dest: Point;
  }
}

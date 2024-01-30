export const ROWS = Math.floor(
  (document.documentElement.clientHeight - 50) / 20
);
export const COLS = Math.floor(document.documentElement.clientWidth / 20);

document.body.style.setProperty('--rows', ROWS.toString());
document.body.style.setProperty('--cols', COLS.toString());

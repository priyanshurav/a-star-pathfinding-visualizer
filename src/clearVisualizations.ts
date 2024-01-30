const gridEl = document.querySelector<HTMLDivElement>(
  '.grid'
) as HTMLDivElement;

export default (): void => {
  (gridEl.childNodes as NodeListOf<HTMLDivElement>).forEach((n) =>
    n.classList.remove('open', 'close', 'path')
  );
};

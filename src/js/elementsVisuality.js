function hideElement(selector, parrent = document) {
  if (typeof selector === 'object') {
    selector.classList.add('display-none');
    return;
  }

  const el = parrent.querySelector(selector);
  if (!el) return;
  el.classList.add('display-none');
}

function showElement(selector, parrent = document) {
  if (typeof selector === 'object') {
    selector.classList.remove('display-none');
    return;
  }
  const el = parrent.querySelector(selector);
  if (!el) return;
  el.classList.remove('display-none');
}

export { hideElement, showElement };

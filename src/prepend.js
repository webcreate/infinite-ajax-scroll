export function prependFn(items, parent, first) {
  let insert = document.createDocumentFragment();

  items.forEach((item) => {
    insert.appendChild(item);
  });

  parent.insertBefore(insert, first);
}

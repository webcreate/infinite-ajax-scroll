export function appendFn(items, parent, last) {
  let sibling = last ? last.nextSibling : null;
  let insert = document.createDocumentFragment();

  items.forEach((item) => {
    insert.appendChild(item);
  });

  parent.insertBefore(insert, sibling);
}

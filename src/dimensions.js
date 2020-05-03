
export function getScrollPosition(el) {
  if (el !== window) {
    return {
      x: el.scrollLeft,
      y: el.scrollTop,
    };
  }

  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

  return {
    x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
    y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
  };
}

export function getRootRect(el) {
  let rootRect;

  if (el !== window) {
    rootRect = el.getBoundingClientRect();
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    const html = document.documentElement;
    const body = document.body;

    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }

  return rootRect;
}

export function getDistanceToFold(sentinel, scrollContainerScrollPosition, scrollContainerRootRect) {
  let rootRect = scrollContainerRootRect;

  // this means the container the doesn't have any items yet - it's empty
  if (!sentinel) {
    return rootRect.height * -1;
  }

  let scrollYTop = scrollContainerScrollPosition.y;
  let boundingRect = sentinel.getBoundingClientRect();

  let scrollYBottom = scrollYTop + rootRect.height;
  let bottom = scrollYTop + boundingRect.bottom - rootRect.top;

  return Math.trunc(bottom - scrollYBottom);
}

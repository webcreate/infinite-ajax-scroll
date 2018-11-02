function loadScript(url) {
  return cy.window().then((win) => {
    let document = win.document;

    return new Cypress.Promise((resolve, reject) => {
      console.log(document);

      // Adding the script tag to the head as suggested before
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = () => { resolve(win); };
      script.onload = () => { resolve(win); };

      // Fire the loading
      head.appendChild(script);
    });
  });
}

Cypress.Commands.add('InfiniteAjaxScroll', () => {
  return loadScript('http://localhost:8080/dist/infinite-ajax-scroll.js').then((win) => {
    return new Cypress.Promise((resolve, reject) => {
      resolve(win.InfiniteAjaxScroll);
    });
  });
});

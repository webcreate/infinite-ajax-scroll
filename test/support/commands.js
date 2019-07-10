function loadScript(url) {
  return cy.window().then({timeout: 10000}, (win) => {
    let document = win.document;

    return new Cypress.Promise((resolve) => {
      let head = document.getElementsByTagName('head')[0];
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => { resolve(win); };

      // Fire the loading
      head.appendChild(script);
    });
  });
}

Cypress.Commands.add('InfiniteAjaxScroll', () => {
  return loadScript('http://localhost:8080/dist/infinite-ajax-scroll.min.js').then((win) => {
    return new Cypress.Promise((resolve) => {
      resolve(win.InfiniteAjaxScroll);
    });
  });
});

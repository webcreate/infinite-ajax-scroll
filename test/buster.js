var config = module.exports;

config["My tests"] = {
  rootPath: "../",
  environment: "browser", // or "node"
  libs: [
    "bower_components/jquery/jquery.min.js"
  ],
  sources: [
    "src/callbacks.js",
    "src/jquery-ias.js",
    "src/extension/paging.js",
    "src/extension/spinner.js",
    "src/extension/trigger.js",
    "src/extension/noneleft.js"
  ],
  resources: [
    { path: "/",            file: "test/fixtures/page1.html" },
    { path: "/page2.html",  file: "test/fixtures/page2.html" },
    { path: "/page3.html",  file: "test/fixtures/page3.html" },
    { path: "/framed.html", file: "test/fixtures/framed.html" },
    { path: "/short.html",  file: "test/fixtures/short.html" }
  ],
  specs: [
    "test/*-test.js"
  ],
  specHelpers: [
    "test/helpers/*.js"
  ]
};

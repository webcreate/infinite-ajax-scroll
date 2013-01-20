var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser",
    libs: [
        "components/jquery/jquery.js",
    ],
    sources: [
        "jquery.ias.js"
    ],
    resources: [
         { path: "/", file: "spec/fixtures/page1.html" },
         { path: "/page2.html", file: "spec/fixtures/page2.html" },
         { path: "/css/jquery.ias.css", file: "css/jquery.ias.css" },
         { path: "/images/loader.gif", file: "images/loader.gif" }
    ],
    specs: [
        "spec/*-test.js"
    ],
    specHelpers: [
        "spec/helpers/*.js",
    ],
}
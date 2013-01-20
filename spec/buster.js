var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser",
    libs: [
        "src/components/jquery/jquery.js"
    ],
    sources: [
        "src/jquery-ias.js"
    ],
    resources: [
         { path: "/", file: "spec/fixtures/page1.html" },
         { path: "/page2.html", file: "spec/fixtures/page2.html" },
         { path: "/css/jquery.ias.css", file: "src/css/jquery.ias.css" },
         { path: "/images/loader.gif", file: "src/images/loader.gif" }
    ],
    specs: [
        "spec/*-test.js"
    ],
    specHelpers: [
        "spec/helpers/*.js"
    ]
}
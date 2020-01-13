# How to Contribute

Thanks for choosing to contribute and taking the time to read this!

We are try to make contributing to this project as easy and transparent as possible. Hopefully this
document answers all your questions regarding the process for contributing to Infinite Ajax Scroll.

## Code Of Conduct

This project adheres to the Infinite Ajax Scroll [Code of Conduct](CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code. Please report unacceptable behavior to
[hello@webcreate.nl](mailto:hello@webcreate.nl).

## Branch organisation

We use a branching model called [Trunk-Based Development](https://trunkbaseddevelopment.com/). This
means that all commits are against the master branch and that we do our best to keep it in good shape,
with tests passing at all times.

Older versions are moved to a separate branch. For example, version 2 resides in the 2.x branch. Previous
versions are kept for reference.

## Semantic Versioning

Infinite Ajax Scroll follows [semantic versioning](https://semver.org/). We release patch versions for
bugfixes, minor versions for new features, and major versions for any breaking changes.

Every significant change is documented in the [changelog file](CHANGELOG.md).

## Bugs

### Issue Tracker

We are using [Github Issues](https://github.com/webcreate/infinite-ajax-scroll/issues) for issue tracking.
Before filing a new issue, try to make sure your problem does not already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case or a live url. This
[Codesandbox](https://codesandbox.io/s/github/webcreate/infinite-ajax-scroll/tree/master/examples/articles)
is a good great starting point for a reduced test case.

### Security Issues

Security issues shouldn't be reported on this issue tracker. See our [security policy](SECURITY.md)
for more information.

## Contribution Prerequisites

* You have Node and NPM installed
* You have GNU Make installed
* You are familiar with Git.

## Style Guide

We use [ESLint](https://eslint.org/) to catch most coding style issues. You can check the status of
you code styling by running `npm run lint`.

We also provide a [`.editorconfig`](https://editorconfig.org/) which your IDE can use.

## Generating dist files from source

Want to try a new feature that has landed in master? Follow these instruction to generate dist files locally.

1. Clone the repository

   ```
   git clone git@github.com:webcreate/infinite-ajax-scroll.git
   ```

2. Install the project dependencies

   ```
   npm install
   ```

3. Build dist files

   ```
   npm run build --production
   ```
   
   You can find the dist files in the /dist folder.


## Setting up your development environment

Follow these steps to start working on a new feature or bugfix.

1. [Fork the repository](https://help.github.com/en/articles/fork-a-repo)

2. Clone the repository

   ```
   git clone git@github.com:YOUR_USERNAME/infinite-ajax-scroll.git
   ```

3. Install the project dependencies

   ```
   make install
   ```

3. Start the webserver

   ```
   make up
   ```

3. Start watching for changes

   ```
   npm run watch &
   ```

   Also start watching any example that you want to use:

   ```
   cd examples/article && npm run watch &
   ```

4. Create a feature branch

   ```
   git checkout -b name-of-feature-branch
   ```

5. Work on your feature or bugfix
6. Run the test suits

   ```
   npm run test
   ```

   or to test with a GUI

   ```
   npm run cypress
   ```

6. Commit and push to your fork
7. Create a pull request on Github

## License

By contributing to Infinite Ajax Scroll, you agree that your contributions will be licensed under the
[Infinite Ajax Scroll License](LICENSE).

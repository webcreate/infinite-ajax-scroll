## Contributing

To contribute to Infinite Ajax Scroll please follow these instructions:

* Fork the project and create a new feature branch
* Install the development tools
* Write the feature/bugfix
* Write tests for the feature/bugfix
* Run tests
* Submit your Pull Request

### Installing development tools

1. Install bower components

    ``` sh
    $ bower install
    ```

2. Install npm modules

    ``` sh
    $ npm install
    ```

### Running tests

Testing is done with [Busterjs](https://github.com/busterjs/buster) and [Grunt](https://github.com/gruntjs/grunt).

1. Start a buster server:

    ``` sh
    $ grunt buster::server:block
    ```

2. Launch some browsers and connect to `http://localhost:1111` and capture them.

3. Run tests:

    ``` sh
    $ grunt buster::test
    ```

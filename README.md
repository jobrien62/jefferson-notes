# Notes on the State of Virginia
[![Build Status](https://travis-ci.org/waynegraham/jefferson-notes.png?branch=master)](https://travis-ci.org/waynegraham/jefferson-notes)
[![Code Climate](https://codeclimate.com/github/waynegraham/jefferson-notes.png)](https://codeclimate.com/github/waynegraham/jefferson-notes)
[![Coverage Status](https://coveralls.io/repos/waynegraham/jefferson-notes/badge.png?branch=master)](https://coveralls.io/r/waynegraham/jefferson-notes?branch=master)
[![Dependency Status](https://gemnasium.com/waynegraham/jefferson-notes.png)](https://gemnasium.com/waynegraham/jefferson-notes)

## Dependencies

* Rails
* bower (for managing JavaScript dependencies)

### Bower

```shell
$ npm install -g bower
```

## Running

```shell
$ bundle install
$ bower install
$ rake db:migrate
$ rake import:docs
$ rake import:images
$ foreman start
```

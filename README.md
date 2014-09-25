# Notes on the State of Virginia
[![Build Status](https://travis-ci.org/waynegraham/jefferson-notes.png?branch=master)](https://travis-ci.org/waynegraham/jefferson-notes)
[![Code Climate](https://codeclimate.com/github/waynegraham/jefferson-notes.png)](https://codeclimate.com/github/waynegraham/jefferson-notes)
[![Coverage Status](https://coveralls.io/repos/waynegraham/jefferson-notes/badge.png?branch=master)](https://coveralls.io/r/waynegraham/jefferson-notes?branch=master)
[![Dependency Status](https://gemnasium.com/waynegraham/jefferson-notes.png)](https://gemnasium.com/waynegraham/jefferson-notes)

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Deploy your own *Notes on Virginia** instance to Heroku by clicking the "Deploy to Heroku button." Follow the Heroku instructions for importing your source code and cloning the new repository to your desktop. From within your new app's repository, you will need to run the following command to set up the database:

```
$ heroku run rake db:migrate
$ heroku run rake import:milestones
```

## Development Dependencies

* Ruby 2.1.2
* Rails 4.x
* npm with bower (for managing JavaScript dependencies)

### Bower

```shell
$ npm install -g bower
```

## Project Setup

```shell
$ mkdir -p ~/projects
$ cd projects
$ git clone https://github.com/waynegraham/jefferson-notes.git
$ cd jefferson-notes
$ bundle install
$ rake import:reset
$ foreman start -f Procfile.dev
```

## Changes

Any changes you make need to be committed back to GitHub.

```shell
$ cd ~/projects/jefferson-notes
$ git status
On branch develop
Your branch is ahead of 'origin/develop' by 1 commit.
  (use "git push" to publish your local commits)
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   README.md
	modified:   lib/tasks/import.rake
$ git commit -am "A useful note about what you did"
$ git push origin master
```

## Editing Image/Text

Thumbnails are injected in to the HTML file before being inserted in to the
database. The process involves reading the HTML source file, finding the
`.pagenum` attribute, parsing the "page" number from that string, then looking
up the proper `pid` for the page in the CSV file
(`lib/assets/pages-correlate-no-sync.csv`).

|1787_file | 1787_pid | 1787_page | 1784_file | 1784_page | 1784_pid | slug | notes_1787 | transcriptions|
|----------|----------|-----------|-----------|-----------|----------|------|------------|---------------|
|0063.tif|763496|15|0032.tif|17|1195312|15| |	|
|0064.tif|763497|16|0033.tif|18|1195313|16|	| |
|0065.tif|763498|17|0034.tif|19|1195314|17| | |
|0066.tif|763499|18|0035.tif|20|1195315|18|lining up|27

Mostly this means updating the `1787_pid` field with what is in the library's
repository. Simply navigate to the correct page for the edition in the page
viewer and note the **second** `uva-lib:nnnnnn` in the URL.

* [Paris 1784 edition][1784]
* [Stockton 1787 edition][1787]

You can also click on the thumbnail image and add/subtract from that number
in the pid field to get the correct page number.

For instance, the advertisement page in the Stockdale edition has a pid of
*763636* that you can find in the URL in the `uva-lib:763636`. All we need
is the number here.

http://fedoraproxy.lib.virginia.edu/fedora/objects/uva-lib:763636/methods/djatoka:StaticSDef/getStaticImage

## Local Checks

If you make updates to the mappings, you should verify the check before
committing the change.

```shell
$ cd ~/projects/jefferson-notes
$ rake import:reset
$ foreman start
```
Point your browser at the local server (`http://localhost:5000`) and
navigate to the appropriate place and verify that the change is correct.
You can stop the server with `ctrl + c`. If you have made changes to the
CSV or HTML file, you will need to follow the instructions in the next
section.

## Deployment

This project uses continuous deployment through Travis-ci. When the code is
pushed to GitHub, [Travis-ci][ci] will run the test suite. If the tests pass,
the project is then auto-deployed to Heroku. Most of the time, you will not need
to do anything (assuming the tests pass) to deploy the code to the live site.

If you make an update to the mapping between the images and page numbers in
`lib/assets/pages-correlate-no-sync.csv` or the HTML code in
`lib/assets/stockdale1787.final.html`, you will need to take an additional step.

```shell
$ cd ~/projects/jefferson-notes
$ git push origin master
$ rake import:heroku_reset
```

[1784]: http://search.lib.virginia.edu/catalog/uva-lib:710304/view
[1787]: http://search.lib.virginia.edu/catalog/uva-lib:760484/view
[ci]: https://travis-ci.org/waynegraham/jefferson-notesb

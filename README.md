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

## Deployment

```shell
$ git push heroku develop:master
$ heroku pg:reset DATABASE
$ heroku run rake db:migrate
$ heroku run rake import:milestones
```

## Adding Transcriptions

Log in and find the page that requires the transcription (in
`lib/assets/transcriptions`). Copy the body of the file and add it
between this template:

```html
<div>
  <p><a href="#" class="transcription-trigger">Marginalia</a></p>
  <div class="modal-content transcription-body">
    ...
  </div>
</div>

```

This then goes in to the `.thumbs` div (before the link to the
repository).

A full example from the Advertisement in the 1787 edition:

```html
<div>
  <p><a href="#" class="transcription-trigger">Marginalia</a></p>

  <div class="modal-content transcription-body">
    <div id="xw20aab3b3" class="addTranscription">
      <ul id="xw20aab3b3b1">
         <li id="xw20aab3b3b1b1"> +</li>
         <li id="xw20aab3b3b1b3"> Barbé Marbois</li>
      </ul>
    </div>
    <div id="xw20aab3b5" class="addDescription">
      <p id="xw20aab3b5b1">The two manuscript additions are in pencil. A plus sign in the text follows "among
         us." In the bottom margin the name "Barbé Marbois" appears, referring to François
         Barbé-Marbois (1745-1837), the secretary of the French legation whose questionnaire
         prompted Jefferson to begin work on the earliest draft of the <i id="xw20aab3b5b1b1">Notes</i>.
      </p>
      <p id="xw20aab3b5b3">Over 150 pencil marks appear throughout Jefferson's personal copy. These marks and
         others like them were not made by Jefferson but by one or more people involved in
         the publication of a posthumous edition of the <i id="xw20aab3b5b3b1">Notes</i>, printed in 1853 by Charles H. Wynne for Joseph Williamson Randolph in Richmond.
         The 1853 edition was the first to include the additions and revisions recorded in
         Jefferson's personal copy. The pencil marks guide the typesetting of the new edition
         by indicating how to incorporate Jefferson's manuscript additions. Jefferson's personal
         copy therefore records its author's revisions but also offers evidence of how a printer
         in nineteenth-century America might edit a text to accommodate author intent.
      </p>
    </div>
  </div>
</div>

```

The entire file would then look like this:

```html
<div id="advertisement" class="query">
  <h4 id="xw20aab3b1">ADVERTISEMENT</h4>
  <span id="advertisement" class="pagenum"></span>

<div class="thumbs" id="0">
<div>
  <p><a href="#" class="transcription-trigger">Marginalia</a></p>

  <div class="modal-content transcription-body">
    <div id="xw20aab3b3" class="addTranscription">
      <ul id="xw20aab3b3b1">
         <li id="xw20aab3b3b1b1"> +</li>
         <li id="xw20aab3b3b1b3"> Barbé Marbois</li>
      </ul>
    </div>
    <div id="xw20aab3b5" class="addDescription">
      <p id="xw20aab3b5b1">The two manuscript additions are in pencil. A plus sign in the text follows "among
         us." In the bottom margin the name "Barbé Marbois" appears, referring to François
         Barbé-Marbois (1745-1837), the secretary of the French legation whose questionnaire
         prompted Jefferson to begin work on the earliest draft of the <i id="xw20aab3b5b1b1">Notes</i>.
      </p>
      <p id="xw20aab3b5b3">Over 150 pencil marks appear throughout Jefferson's personal copy. These marks and
         others like them were not made by Jefferson but by one or more people involved in
         the publication of a posthumous edition of the <i id="xw20aab3b5b3b1">Notes</i>, printed in 1853 by Charles H. Wynne for Joseph Williamson Randolph in Richmond.
         The 1853 edition was the first to include the additions and revisions recorded in
         Jefferson's personal copy. The pencil marks guide the typesetting of the new edition
         by indicating how to incorporate Jefferson's manuscript additions. Jefferson's personal
         copy therefore records its author's revisions but also offers evidence of how a printer
         in nineteenth-century America might edit a text to accommodate author intent.
      </p>
    </div>
  </div>
</div>


       <a href="http://fedoraproxy.lib.virginia.edu/fedora/objects/uva-lib:763480/methods/djatoka:StaticSDef/getStaticImage">
        <figure>
          <img alt="1787 Edition" class="thumb lazy" width="89" height="125" data-original="http://fedoraproxy.lib.virginia.edu/fedora/objects/uva-lib:763480/methods/djatoka:StaticSDef/getThumbnail">
          <figcaption>1787 Edition</figcaption>
        </figure>
       </a>
      </div>


 <p id="xw20aab3b7"><i id="xw20aab3b7a">THE</i> following Notes were written in Virginia in
  the year 1781, and somewhat corrected and enlarged in the winter of 1782, in answer to
  Queries proposed to the Author, by a Foreigner of Distinction, <i id="editorial-xw20aab3b7b2" class="fa fa-info-circle editorialTrigger"></i><span id="xw20aab3b7b2" class="addEditorial">Jefferson is referring to Fran&#xE7;ois
    Barb&#xE9;-Marbois (1745-1837), who was secretary to the French legation to the early
    United States. In 1780, Marbois gave a questionnaire to representatives of each of
    the thirteen states so that he could produce a report on the new nation. The
    questionnaire for Virginia was passed on to Jefferson, who took on the project of
    answering Marbois's queries; <i id="xw20aab3b7b2b1">Notes on the State of Virginia
    </i> is, ultimately, the product. In 1803, when Jefferson was President, Marbois
    negotiated the Louisiana Purchase with him.</span> then residing among us. The
  subjects are all treated imperfectly; some scarcely touched on. To apologize for this by
  developing the circumstances of the time and place of their composition, would be to
  open wounds which have already bled enough. To these circumstances some of their
  imperfections may with truth be ascribed; the great mass to the want of information and
  want of talents in the writer. He had a few copies printed, <i id="editorial-xw20aab3b7b4" class="fa fa-info-circle editorialTrigger"></i><span id="xw20aab3b7b4" class="addEditorial">In 1784, Jefferson had a private edition of
    200 copies of <i id="xw20aab3b7b4b1">Notes on the State of Virginia </i>printed in
    Paris; one of the copies of that printing has been digitized for this edition.
    Another copy was obtained by a French bookseller, who issued a translation of the
    work into French; unhappy with errors that had crept into the text, and worried that
    the book would now be translated back into English (with, very likely, more errors
    produced in that process), Jefferson approached the London publisher John Stockdale
    to issue a new, English edition. Page images of Jefferson&#x2019;s own copy of the
    1787 London edition, which was extensively annotated and amended by him in later
    years, are also included in this edition.</span> which he gave among his friends:
  and a translation of them has been lately published in France, but with such alterations
  as the laws of the press in that country rendered necessary. They are now offered to the
  public in their original form and language. </p>
  <div class="dateline"><p>Feb. 27, 1787.</p></div>
</div>
```

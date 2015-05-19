# History Seeker

This is an application that easily allows students and teacher to explore
history and collect historical 'facts' into an organized grouping called a
curriculum. Teachers can create new 'facts' or choose existing ones.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* cd historicity
* `npm install`
* `bower install`

## Running / Development

In order to run locally you must modify the application adapter `app/adapters/application.js` by changing the host from `https://intense-castle-9219.herokuapp.com` to `http://localhost:3000`

You will need to clone the rails backend:
* `git clone https://github.com/isotope11/history_seeker_rails_api_brandon.git`
* `cd history_seeker_rails_api_brandon`
* `bundle`
* `rake db:setup`
* change the origin in `config/application.rb` from `development.historicity.divshot.io` to `localhost:4200` // TODO: make this simpler
* `rails s`

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

ember divshot push

http://development.historicity.divshot.io/

## Data Model
```
User
  |- first_name
  |- middle_name
  |- last_name
  |- date_of_birth
  |- role
  |- notes
  |- students: hasMany('user', { inverse: teacher})
  |- teacher: belongsTo('user', { inverse: students })
  |- curriculum: hasMany('curriculum')

Fact
  |- title
  |- description
  |- start_date
  |- end_date
  |- lat
  |- lng

curriculum
   |- title
   |- hasMany('facts')
```

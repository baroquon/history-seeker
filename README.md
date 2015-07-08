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

* `git clone git@github.com:isotope11/history_seeker.git` this repository
* cd history-seeker
* `npm install`
* `bower install`

## Running / Development

If you want to run the backend locally you must modify the application adapter `app/adapters/application.js` by changing the host from `https://api.historyseeker.com` to `http://localhost:3000`

If you want to make changes to the rails backend/work with a local database:
* `git clone https://github.com/isotope11/history_seeker_rails_api_brandon.git`
* `cd history_seeker_rails_api_brandon`
* `bundle`
* `rake db:setup`
* `rails s`

To run the frontend locally against the production backend, just do
* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

## Development Deploy

ember divshot push

http://development.historicity.divshot.io/

## Production Deploy

ember divshot push production

http://historyseeker.com/

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
  |- facts: hasMany('fact')

Fact
  |- title
  |- description
  |- start_date
  |- end_date
  |- lat
  |- lng
  |- testable(boolean)
  |- start_year(computed from start_date)
  |- end_year(computed from end_date)

curriculum
  |- title
  |- description
  |- hasMany('facts')

```

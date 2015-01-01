source 'https://rubygems.org'
ruby '2.1.5'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 4.2.0'

# Use SCSS for stylesheets
gem "sass", "~> 3.3.0"
gem 'sass-rails', '~> 4.0.0'
gem "compass-rails", "~> 2.0.0"
gem "susy", "~> 2.1.3"

gem "sprockets", "2.11.0"

gem "roman-numerals", "~> 0.3.0"

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'


# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
gem 'jquery-turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

## Custom requirements for application

#gem "thin"
gem "unicorn"
# page caching
gem 'actionpack-action_caching'
gem 'actionpack-page_caching'

# Processing the html text
# This is really just for the inital parsing of the data in to the data structure
gem "nokogiri", "~> 1.6.0"

# for generating nice URLs
gem "friendly_id", "~> 5.0.0"

gem 'awesome_print'

gem "rsolr", "~>1.0.9"

gem "will_paginate", "~>3.0"

gem 'titleize', '~> 1.3.0'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :production do
  gem 'pg'
  gem 'rails_12factor'
  gem 'heroku-deflater'
  gem 'dalli'
end

group :development do
  gem "foreman"
  gem "rack-livereload"
  gem "guard"
  gem "guard-bundler"
  gem 'guard-rspec'
  gem 'guard-livereload'
  gem 'rb-fsevent', :require => false
  gem 'sprockets_better_errors'
  gem 'bullet'
end

group :development, :test do
  gem 'sqlite3'
  gem 'rspec-rails', '~> 2.0'
  gem "factory_girl_rails", "~> 4.2.1"
  gem "capybara", "~> 2.1.0"
  gem "database_cleaner", "~> 1.2.0"
  gem "faker", "~> 1.2.0"
  gem 'coveralls', require: false
  gem 'dotenv-rails'
end

group :test do
  gem 'simplecov', :require => false
end


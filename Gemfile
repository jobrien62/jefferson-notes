source 'https://rubygems.org'
ruby '2.1.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'
gem "compass-rails", "~> 1.1.2"
gem "susy", "~> 2.0.0.alpha.4"

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'


# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

## Custom requirements for application

gem "thin"
# page caching
gem 'actionpack-action_caching'
gem 'actionpack-page_caching'

# Processing the html text
# This is really just for the inital parsing of the data in to the data structure
gem "nokogiri", "~> 1.6.0"

# for generating nice URLs
gem "friendly_id", "~> 5.0.0"

gem 'awesome_print'


group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :production do
  gem 'pg'
  gem 'rails_12factor'
  gem 'heroku-deflater'
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
  gem 'dotenv-rails'
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


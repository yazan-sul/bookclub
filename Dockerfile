# Use official Ruby image
FROM ruby:3.2

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

# Set working directory
WORKDIR /app

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install

# Copy the rest of the app
COPY . .

# Expose port for Sinatra
EXPOSE 4567

# Set environment variable for Sinatra
ENV RACK_ENV=production

# Start the app
CMD ["ruby", "main.rb"]
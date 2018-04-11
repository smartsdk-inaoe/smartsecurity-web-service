FROM node:8

# Create a directory where our app will be placed
RUN mkdir -p /webservice

# Change directory so that our commands run inside this new directory
WORKDIR /webservice

# Get all the code needed to run the app and the dependency definitions
COPY . /webservice

# Install dependecies
RUN npm i

# Expose the port the app runs in
EXPOSE 4005

# Serve the app
CMD ["npm", "start"]

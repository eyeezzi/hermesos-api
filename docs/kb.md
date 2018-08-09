# Setting up project

## General data management idea

1 project = 1 cluster
1 cluster = 2 databases: [dev, prod]
1 database = N collections: [User, SOS]
1 collection = N documents
1 document = N key-value pairs

## Setup a MongoDB cluster in the cloud using Mongo Atlas verify you can connect to it

1. Create a free MongoDB Atlas account and setup a cluster.
2. In cluster security, whitelist every IP (for dev purpose).
3. Create a user with read/write privilege for "dev" database (which will be created later).
4. Setup your Node.js project and install `mongoose` as MongoDB driver.
5. Connect from Node.js to MongoDB with user credentials.

## Save models in mongoDB

1. Create a shema file defining the model's structure.
2. Instantiate a mongoose model following the defined schema.
3. Save the model object and confirm in the promise return.

> Tip: Install *MongoDB Compass* on your machine and use it to explore/visualize your cluster, databases, and collections.

## Pains of working in Javascript

- Because function return types and exception behaviour are not explicitly specified, there are no easy ways to know whether a function throws an exception. For example, some a function like `parseInt('text')` will return `NaN` while `JSON.parse('not-json')` will throw an exception.
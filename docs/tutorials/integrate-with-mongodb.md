---
sidebar_position: 3
tags: ['mongo', 'mongodb', 'nosql', 'json', 'database', 'document database']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Integrate with MongoDB

<Icon icon="logos:mongodb-icon" height="100" />

MongoDB is a flexible document database system that stores data in JSON-like documents.

Official Website: [https://www.mongodb.com](https://www.mongodb.com)

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    Documentation: [http://mongodb.github.io/node-mongodb-native/](http://mongodb.github.io/node-mongodb-native/)  
    NPM: [https://www.npmjs.com/package/mongodb](https://www.npmjs.com/package/mongodb)  
    Source Code: [https://github.com/mongodb/node-mongodb-native](https://github.com/mongodb/node-mongodb-native)  

    ### Getting started
    1. Create a MongoDB client in `/less/shared/mongodb_client/index.js`.
        ```javascript title="/less/shared/mongodb_client/index.js" showLineNumbers
        const { MongoClient } = require('mongodb');

        const MONGODB = {
          URI: 'mongodb+srv://YOUR_MONGODB_URI',
          DATABASE_NAME: 'YOUR_DATABASE_NAME',
          COLLECTION_NAME: 'YOUR_DATABASE_COLLECTION'
        };
        
        let client;
        const connect = async () => {
          if (!client) {
            client = new MongoClient(MONGODB.URI);
            await client.connect();
          }
        };

        const insert_item = async (item) => {
          await connect();
          const db = client.db(MONGODB.DATABASE_NAME);
          const collection = db.collection(MONGODB.COLLECTION_NAME);
          return await collection.insertOne(item);
        };

        const list_items = async () => {
          await connect();
          const db = client.db(MONGODB.DATABASE_NAME);
          const collection = db.collection(MONGODB.COLLECTION_NAME);
          return await collection.find().toArray();
        }

        module.exports = {
          insert_item,
          list_items
        };
        ```

    2. Create a `POST /items` route in `/less/apis/demo/items/post.js`.
        ```javascript title="/less/apis/demo/items/post.js" showLineNumbers
        const { insert_item } = require('mongodb_client');

        exports.process = async (request, response) => {
          const payload = JSON.parse(request.body);
          await insert_item(payload);
          response.body = JSON.stringify(payload);
          response.statusCode = 201;
          return response;
        };
        ```

    3. Create a `GET /items` route in `/less/apis/demo/items/get.js`.
        ```javascript title="/less/apis/demo/items/get.js" showLineNumbers
        const { list_items } = require('mongodb_client');

        exports.process = async (request, response) => {
          const result = await list_items();
          response.body = JSON.stringify(result);
          response.statusCode = 200;
          return response;
        };
        ```

    4. Deploy!
        ```shell
        less-cli deploy YOUR_PROJECT_NAME
        ```
  </TabItem>

  <TabItem value="py" label="Python">
    Documentation: [https://pymongo.readthedocs.io/en/stable/](https://pymongo.readthedocs.io/en/stable/)  
    Pypi Package: [https://pypi.org/project/pymongo/](https://pypi.org/project/pymongo/)  
    Source Code: [https://github.com/mongodb/mongo-python-driver](https://github.com/mongodb/mongo-python-driver)  

    ### Getting started
    1. Create a Python Mongodb client in `/less/shared/mongodb_client_py/__init__.py`.
        ```python
        import os
        from pymongo import MongoClient

        MONGODB_URI = os.environ.get('MONGODB_URI')
        MONGODB_DATABASE_NAME = os.environ.get('MONGODB_DATABASE_NAME')

        client = MongoClient(MONGODB_URI)
        db = client[MONGODB_DATABASE_NAME]
        collection = db.['my_collection']

        def insert_item(item):
            post_id = collection.insert_one(item)

        def get_all_items():
            return collection.find()
        ```

    2. Create a `GET /hello/py` route in `/less/apis/demo/hello/py/get.py` to test.
        ```python
        from mongodb_client_py import insert_item, get_all_items

        def process(request, response):
            # Insert item.
            insert_item({ 'bar': 'baz' })

            # Get all items.
            result = get_all_items()
            
            # Return HTTP response.
            response.body = result
            return response
        ```

    3. Deploy!
        ```shell
        npx @chuva.io/less-cli deploy YOUR_PROJECT_NAME
        ```
  </TabItem>
  
</Tabs>

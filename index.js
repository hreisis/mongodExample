const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';
 
MongoClient.connect(url, { useUnifiedTopology: true}, (err, client) => { //make connect
    assert.strictEqual(err, null); // test equal
    console.log('Connected correctly to server');

    //access the database
    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);

        console.log('Dropped Collection', result); //result if successful

        const collection = db.collection('campsites'); //create a collection

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => { //insert a new collection
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops); //ops is short for operations

            collection.find().toArray((err, docs) => { //convert a document to an array
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close(); //close the connection with MongoDB server
            })
        })
    })
})
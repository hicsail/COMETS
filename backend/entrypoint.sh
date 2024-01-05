#!/bin/bash

# Start MongoDB in the background
mongod --fork --logpath /var/log/mongodb.log --bind_ip 0.0.0.0

# Wait for MongoDB to start
until mongo --eval "db.adminCommand({ping: 1})" 2>/dev/null; do
  sleep 1
done

# Create a new database and collection
mongo mydb --eval "db.createCollection('jobs')"

# Insert a document into the collection
mongo mydb --eval "db.mycollection.insert({
	"name": "test-job",
    "defaultVMax": 200,
    "defaultKm": 20,
    "maxCycles": 5,
    "timeStep": 10,
    "spaceWidth": 2,
    "maxSpaceBiomass": 4,
    "minSpaceBiomass": 1,
    "writeMediaLog": false,
    "writeFluxLog": false,
    "fluxLogRate": 0
})"

# Stop MongoDB
mongod --shutdown

# Start MongoDB as the main process
exec "$@"

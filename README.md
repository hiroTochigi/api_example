# My Node.js Project

This is a sample Node.js project that provides a REST API for managing users.

## Prerequisites

- Docker
- Node.js and npm (comes with Node.js)

## Installation

1. Clone the repository:

```
git clone https://github.com/<username>/my-node-project.git
```

2. Install the dependencies:

```
cd my-node-project
npm install
```

## Running the app

1. Start MongoDB:

```
docker run --name my-mongo -d -p 27017:27017 mongo
```

This will pull the latest version of the MongoDB image from Docker Hub and start a container with the name `my-mongo`. The `-d` flag runs the container in detached mode, and the `-p` flag exposes the container's port 27017 on the host machine.

2. Create the `mydatabase` database:

```
docker exec -it my-mongo mongo
```

This will open the MongoDB shell inside the `my-mongo` container. Then, use the following commands to create the `mydatabase` database:

```
use mydatabase
db.createCollection("users")
```

2. Run the app:

```
node index.js
```

The app will be running at http://localhost:3000.

## API documentation

### Get a list of users

```
curl http://localhost:3000/users
```

### Get a single user by ID

```
curl http://localhost:3000/users/<id>
```

Replace `<id>` with the ID of the user.

### Create a new user

```
curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "email": "john@example.com", "password": "abc123"}' http://localhost:3000/users
```

### Update a user

```
curl -X PUT -H "Content-Type: application/json" -d '{"name": "John Smith"}' http://localhost:3000/users/<id>
```

Replace `<id>` with the ID of the user.

### Delete a user

```
curl -X DELETE http://localhost:3000/users/<id>
```

Replace `<id>` with the ID of the user.

## License

This project is licensed under the MIT License.

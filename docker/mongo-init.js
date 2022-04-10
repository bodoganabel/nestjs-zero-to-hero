require('dotenv').config()

db.createUser({
    user: process.env.MONGODB_USER,
    pwd: process.env.MONGODB_PASSWORD,
    roles: [{
        role: "readWrite",
        db: process.env.MONGODB_DATABASE_NAME
    }]
});
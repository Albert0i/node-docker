const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const redis = require("redis")
const cors = require("cors");
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");
// Begin redis fix
let RedisStore = require("connect-redis")(session)
// redis@v3
// let redisClient = redis.createClient({
//     host: REDIS_URL,
//     port: REDIS_PORT
// })
// redis@v4
let redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT
    }
})
redisClient.connect().catch(console.error)
redisClient.on('ready', () => console.log(`successfully connected to ${REDIS_URL}:${REDIS_PORT}`));
// End redis fix
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`

const connectWithRetry = (msToWait) => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        //useFindAndModify: false
    })
    .catch(e => {
        console.log(e);
        setTimeout(connectWithRetry, msToWait)
    })
}
connectWithRetry(5000); 

app.enable("trust proxy");
app.use(cors({}));
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true, 
        maxAge: 60 * 1000  // 60 seconds 
    }
}))
app.use(express.json())
app.get("/api/v1", (req, res) => {
    res.send("<h2>Hi There...</h2>")
    console.log("yeah! It ran...")
})
// localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`)); 

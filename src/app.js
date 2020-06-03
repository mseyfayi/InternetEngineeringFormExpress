import express from "express";
import cors from "cors";
import appRouter from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// set routes
appRouter(app);

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({data: err.body});
});

export default app;

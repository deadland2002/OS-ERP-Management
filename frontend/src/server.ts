import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import hbs from "hbs"
import path from "node:path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../',"views"));

app.get("/", (req: Request, res: Response) => {
    res.render("index", {name:"satvik"})
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

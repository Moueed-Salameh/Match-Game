import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "world",
    user: "postgres",
    password: process.env.POSTGRES_PWD,
});

await db.connect();
let dbData = [];
try {
    const res = await db.query("SELECT country, capital FROM capitals ORDER BY random() LIMIT 10");
    dbData = res.rows;
} catch (err) {
    console.error(err);
} finally {
    await db.end()
}

let data = {};
dbData.forEach((item) => {
    data[item.country] = item.capital;
});

const keys = Object.keys(data);
const values = Object.values(data);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

app.use(express.static("public"));

app.get("/", async (req, res) => {
    const rawData = shuffleArray([...keys, ...values]);
    res.render("index.ejs", {dataShuffled: rawData, dataKeyValue: data});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("Go to http://localhost:3000/");
    console.log(data);
});

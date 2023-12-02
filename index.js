import express from "express";

const app = express();
const port = 3000;

const data = {
    "Germany": "Berlin",
    "France": "Paris",
    "Australia":"Canberra",
    "Ireland": "Dublin",
    "Italy": "Rome",
    "United Kingdom": "London",
    "Finland": "Helsinki",
    "Switzerland": "Bern",
    "Jamaica": "Kingston",
    "Indonesia": "Jakarta",
};
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
});
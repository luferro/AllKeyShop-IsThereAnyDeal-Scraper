const express = require('express');
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", function(req, res) {
	res.json({
		"Autor": "Serpine",
        "Github": "https://github.com/xSerpine",
        "Website being scraped": "https://www.allkeyshop.com/blog/",
        "Endpoints": {
            "Search": "/scrape/:title",
            "Top Sellers": "/top/:platform  -  platform: xbox, playstation, nintendo, pc"
        }
	})
})

app.use("/scrape", require("./Routes/scrapeRoute"));

app.listen(PORT, () => {
	console.log("Servidor iniciado na porta " + PORT);
});
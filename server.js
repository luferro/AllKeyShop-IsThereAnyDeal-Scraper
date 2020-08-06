const express = require('express');
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", function(req, res) {
	res.json({
		"Autor": "Serpine",
        "Github": "https://github.com/xSerpine/AllKeyShop-IsThereAnyDeal-Scraper",
        "Websites being scraped": {
            "AllKeyShop": "https://www.allkeyshop.com/blog/",
            "IsThereAnyDeal": "https://isthereanydeal.com/"
        },
        "API URL": "http://localhost:5000",
        "Endpoints": {
            "AllKeyShop": {
                "Game": "/allkeyshop/:title",
                "Search": "/allkeyshop/search/:title",
                "Top Sellers": "/top/:platform  -  platform: xbox, playstation, nintendo, pc"
            },
            "IsThereAnyDeal": {
                "Search": "/isthereanydeal/search/:title"
            }
        }
	})
})

app.use("/allkeyshop", require("./Routes/allkeyshopRoute"));
app.use("/isthereanydeal", require("./Routes/isthereanydealRoute"));

app.listen(PORT, () => {
	console.log("Servidor iniciado na porta " + PORT);
});
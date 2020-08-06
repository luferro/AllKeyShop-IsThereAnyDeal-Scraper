const got = require('got');
const cheerio = require('cheerio');

module.exports = {
    searchGames : async function(req, res){
        try {
            const { title } = req.params;  
            
            let results = [], itens_historical, itens_historical_platform, itens_current, itens_current_platform;
            
            got(`https://isthereanydeal.com/search/?q=${title}`).then(response => {
                let $ = cheerio.load(response.body);

                $('#pageContainer .card-container .card__content').each((i, element) => {
                    const itens_titles = $(element).children().children().first().text();
                    const historical = $(element).find('.card__row')[1];
                    const current = $(element).find('.card__row')[2];

                    historical ? itens_historical = $(historical).children().children('.numtag').children('.numtag__primary').text() : itens_historical = null;
                    historical ? itens_historical_platform = $(historical).children().children('.shopTitle').text().trim() : itens_historical_platform = null;
                    current ? itens_current = $(current).children().children('.numtag').children('.numtag__primary').text() : itens_current = null;
                    current ? itens_current_platform = $(current).children().children('.shopTitle').text().trim() : itens_current_platform = null;

                    results[i] = { 
                        "title": itens_titles,
                        "current price": itens_current,
                        "current price platform": itens_current_platform,
                        "historical low": itens_historical,
                        "historical low platform": itens_historical_platform
                    }
                });	

                return res.json({"results": results})
            
            }).catch(error => console.log(error));
        
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}
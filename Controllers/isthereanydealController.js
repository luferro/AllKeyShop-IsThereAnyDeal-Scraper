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
    },

    getGame : async function(req, res){
        try {
            const { title } = req.params;

            let results = [];

            got(`https://isthereanydeal.com/search/?q=${title}`).then(response => {
                let $ = cheerio.load(response.body);

                let all_itens_href = []
                $('.card-container .card .card__img').each((i, element) => {
                    const itens_href = $(element).attr('href');
                    all_itens_href.push(itens_href);
                });	

                got(`https://isthereanydeal.com${all_itens_href[0]}`).then(response => {
                    let $ = cheerio.load(response.body);

                    $('#pageContainer .layout-2c').each((i, element) => {
                        let prices; 
                        
                        if($(element).children('.layout-2c__col1').children('section').length == 5)
                            prices = $(element).children('.layout-2c__col1').find('.widget')[1];
                        else prices = $(element).children('.layout-2c__col1').find('.widget')[0];

                        const rows = $(prices).children('.table-container').children('.priceTable').children('tbody').children('tr');
                        const rowsLength = $(prices).children('.table-container').children('.priceTable').children('tbody').children('tr').length;

                        for(let idx = 0; idx < rowsLength - 2; idx++) {
                            let itens_stores = $(rows).children('.priceTable__shop').children('.shopTitle').eq(idx).text().trim()
                            let itens_platforms = $(rows).children('.priceTable__platforms').eq(idx).text().trim();
                            let itens_pricecut = $(rows).children('.priceTable__cut').eq(idx).text().trim();
                            let itens_currentprice = $(rows).children('.priceTable__new').eq(idx).text().trim();
                            let itens_lowestprice = $(rows).children('.priceTable__low').eq(idx).text().trim();
                            let itens_regularprice = $(rows).children('.priceTable__old').eq(idx).text().trim();

                            results[idx] = { 
                                "store": itens_stores || itens_stores != "" ? itens_stores : null,
                                "platform": itens_platforms || itens_platforms != "" ? itens_platforms : null,
                                "priceCut": itens_pricecut || itens_pricecut != "" ? itens_pricecut : null,
                                "currentPrice": itens_currentprice || itens_currentprice != "" ? itens_currentprice : null,
                                "lowestPrice": itens_lowestprice || itens_lowestprice != "" ? itens_lowestprice : null,
                                "regularPrice": itens_regularprice || itens_regularprice != "" ? itens_regularprice : null
                            }
                        }
                    });	

                    let rank = $('#pageContainer #gameHead__data div .gameHead__info').last().children('#gameHead__rank').text();
                    let title = $('#pageContainer #gameTitle a').text();
                    let released = $('#pageContainer #gameHead__data div .gameHead__info').first().children('#gameHead__release').text();
                    let description = $('#pageContainer .layout-2c__col1 .widget--about').text();
                    let itens_image = $('#pageContainer #gameHead__img').attr('style');

                    return res.json({
                        "rank": rank || rank != "" ? rank : null,
                        "title": title || title != "" ? title : null,
                        "released": released || released != "" ? released : null,
                        "description": description || description != "" ? description : null,
                        "image": itens_image ? itens_image.slice(22, itens_image.length - 3) : null,
                        "options": results
                    });
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}
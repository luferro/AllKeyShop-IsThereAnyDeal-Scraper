const got = require('got');
const cheerio = require('cheerio');

module.exports = {
    searchGames : async function(req, res){
        try {
            const { title } = req.params;

            let results = [];

            got(`https://www.allkeyshop.com/blog/catalogue/search-${title}/`).then(response => {
                let $ = cheerio.load(response.body);
                
                $('.search-results .search-results-row a').each((i, element) => {
                    const itens_titles = $(element).children('.search-results-row-game').children('.search-results-row-game-title').text();
                    const itens_details = $(element).children('.search-results-row-game').children('.search-results-row-game-infos').text();
                    const itens_prices = $(element).children('.search-results-row-price').text().trim();
                    const itens_img = `https:${$(element).children('.search-results-row-image').children().attr('data-bg')}`;

                    results[i] = { 
                        "title": itens_titles,
                        "details": itens_details,
                        "price": itens_prices,
                        "background": itens_img
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

            let results = [], itens_stores, itens_platforms, itens_edition, itens_coupons, itens_url;

            got(`https://www.allkeyshop.com/blog/catalogue/search-${title}/`).then(response => {
                let $ = cheerio.load(response.body);

                let all_itens_href = []
                $('.search-results .search-results-row a').each((i, element) => {
                    const itens_href = $(element).attr('href');
                    all_itens_href.push(itens_href);
                });	

                got(all_itens_href[0]).then(response => {
                    let $ = cheerio.load(response.body);

                    $('.offers-table .offers-table-row').each((i, element) => {
                        const stores = $(element).find('.offers-table-row-cell')[0];
                        const platforms = $(element).find('.offers-table-row-cell')[1];
                        const edition = $(element).find('.offers-table-row-cell')[2];
                        const coupons = $(element).find('.offers-table-row-cell')[3];
                        const urls = $(element).find('.offers-table-row-cell')[5];

                        const itens_prices = `${$(element).attr('data-price')}€`;

                        stores ? itens_stores = $(stores).children('.offers-merchant').attr('title') : itens_stores = null;
                        platforms ? itens_platforms = $(platforms).children().children('.offers-edition-region').text() : itens_platforms = null;
                        edition ? itens_edition = $(edition).children().text().trim() : itens_edition = null;
                        coupons && $(coupons).children('.coupon').children('.coupon-code').text() != "" ? itens_coupons = $(coupons).children('.coupon').children('.coupon-code').text() : itens_coupons = null;
                        urls ? itens_url = `https:${$(urls).children('a').attr('href')}` : itens_url = null;

                        results[i] = { 
                            "stores": itens_stores,
                            "platforms": itens_platforms,
                            "edition": itens_edition,
                            "prices": itens_prices,
                            "coupon": itens_coupons,
                            "url": itens_url
                        }
                    });	

                    return res.json({
                        "title": $('.game-desc .content-box-title .text-truncate span').first().text().trim(),
                        "score": parseFloat($('.game__sidebar-wrapper .aks-follow .game-aside-button p .hint span').first().text().trim()),
                        "reviewsCount": parseInt($('.game__sidebar-wrapper .aks-follow .game-aside-button p .hint span').last().text().trim()),
                        "results": results
                    })
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getTop : async function(req, res){
        try {
            const { platform } = req.params;

            let results = [];

            let choice;
            if(platform.toLowerCase() == "xbox") choice = "Xbox";
            if(platform.toLowerCase() == "playstation") choice = "PlayStation";
            if(platform.toLowerCase() == "nintendo") choice = "Nintendo";
            if(platform.toLowerCase() == "pc") choice = "Top25";

            got("https://www.allkeyshop.com/blog/").then(response => {
                let $ = cheerio.load(response.body);

                $(`.topclick-list #${choice} .topclick-list-element`).each((i, element) => {
                    const itens_titles = $(element).children('.topclick-list-element-game').children('.topclick-list-element-game-title').text();
                    const itens_stores = $(element).children('.topclick-list-element-game').children('.topclick-list-element-game-merchant').text().trim();
                    const itens_prices = $(element).children('.topclick-list-element-price').text();

                    results[i] = { 
                        "title": itens_titles,
                        "price": itens_prices,
                        "store": itens_stores
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
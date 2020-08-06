const got = require('got');
const cheerio = require('cheerio');

module.exports = {
    getGame : async function(req, res){
        try {
            const { title } = req.params;

            let game, score, amount_score, results = {
                game,
                score,
                amount_score,
                prices: [],
                coupons: [],
                coupons_exist: [],
                platforms: [],
                stores: [],
                url: []
            };

            got(`https://www.allkeyshop.com/blog/catalogue/search-${title}/`).then(response => {
                let $ = cheerio.load(response.body);
                
                let all_results_href = [];
                $('.search-results .search-results-row-link').each((i, element) => {
                    const itens_href = $(element).attr('href');
                    all_results_href.push(itens_href);
                });	

                if(!all_results_href[0]) return res.json("Couldn't find any game.");

                got(all_results_href[0]).then(response => {
                    let $ = cheerio.load(response.body);

                    results.game = $('.game__sidebar-wrapper .gallery .gamepage-images-slide img').attr('alt');   

                    $('.game-aside-button .hint span').each((i, element) => {
                        if($(element).attr('itemprop') == "ratingCount")
                            results.amount_score = $(element).text();
                        else if($(element).attr('itemprop') == "ratingValue")
                            results.score = $(element).text();
                    });	
    
                    $('.offers-table .offers-table-row .offers-merchant .offers-merchant-name').each((i, element) => {
                        const itens_stores = $(element).text().trim();
                        results.stores.push(itens_stores)
                    });	
    
                    $('.offers-table .offers-table-row .offers-edition-region').each((i, element) => {
                        const itens_platform = $(element).text().trim();
                        results.platforms.push(itens_platform)
                    });	
    
                    $('.offers-table .offers-table-row').each((i, element) => {
                        const itens_prices = `${$(element).attr('data-price')}€`;
                        const itens_coupons = $(element).attr('data-voucher-discount-type');
                        const itens_coupons_code = $('.offers-table .offers-table-row .coupon .coupon-code').attr('data-clipboard-text');

                        if(itens_coupons) {
                            results.coupons.push(itens_coupons_code);
                            results.coupons_exist.push(true);
                        }
                        else {
                            results.coupons.push(null);
                            results.coupons_exist.push(false);
                        }

                        results.prices.push(itens_prices);
                    });       

                    $('.offers-table .offers-table-row .d-xl-block').each((i, element) => {
                        const itens_url = $(element).attr('href');
                        results.url.push(`https:${itens_url}`);
                    });	
    
                    return res.json(results);
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

            let results = {};

            let choice;
            if(platform.toLowerCase() == "xbox") choice = "Xbox";
            if(platform.toLowerCase() == "playstation") choice = "PlayStation";
            if(platform.toLowerCase() == "nintendo") choice = "Nintendo";
            if(platform.toLowerCase() == "pc") choice = "Top25";
            

            results[choice] = {
                titles: [],
                prices: [],
                stores: []
            }

            got("https://www.allkeyshop.com/blog/").then(response => {
                let $ = cheerio.load(response.body);

                $(`.topclick-list #${choice} .topclick-list-element .topclick-list-element-game .topclick-list-element-game-title`).each((i, element) => {
                    const itens_titles = $(element).text();
                    results[choice].titles.push(itens_titles);
                });	

                $(`.topclick-list #${choice} .topclick-list-element .topclick-list-element-game .topclick-list-element-game-merchant`).each((i, element) => {
                    const itens_stores = $(element).text().trim();
                    results[choice].stores.push(itens_stores);
                });	

                $(`.topclick-list #${choice} .topclick-list-element .topclick-list-element-price`).each((i, element) => {
                    const itens_prices = $(element).text();
                    results[choice].prices.push(itens_prices);
                });	

                return res.json(results)
            }).catch(error => console.log(error));
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}
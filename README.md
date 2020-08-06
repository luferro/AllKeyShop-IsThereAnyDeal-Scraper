# AllKeyShop-Scraper
Simple AllKeyShop scraper that allows you to search for a specific game and the top 25 sellers on xbox, playstation, nintendo or pc.

Available endpoints:
  - /scrape/:title
  - /scrape/top/:platform

When searching for a game, it will return:
  - Full game's title
  - Score
  - Amount of users that have reviewed the game
  - Prices of all available options
  - Check for coupon availability
  - Coupon code if available
  - Stores of all available options
  
When searching for the top 25 sellers, a platform must be included. These must be xbox, playstation, nintendo or pc. It will return:
  - Name of the platform chosen
  - All 25 titles specific to your chosen platform
  - All 25 prices specific to your chosen platform
  - All 25 stores specific to your chosen platform

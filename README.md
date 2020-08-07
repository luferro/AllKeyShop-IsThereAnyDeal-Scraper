# AllKeyShop/IsThereAnyDeal-Scraper
Simple AKS/ITAD.

Available endpoints:
  - /allkeyshop/search/:title
  - /allkeyshop/top/:platform
  - /isthereanydeal/search/:title

When searching for a game on AllKeyShop.

    /allkeyshop/search/:title
Returns:
  - Game's title
  - Details such as release year and genre
  - Price
  - Image
  
When searching for a game on IsThereAnyDeal.

    /isthereanydeal/search/:title 
Returns:
  - Game's title
  - Current price
  - Store where the current price is available
  - Historical low price
  - Store where the historical low price was available
  
When searching for the top 25 sellers on AllKeyShop, a platform must be included. These must be xbox, playstation, nintendo or pc.
    
    /allkeyshop/top/:platform
Returns:
  - Game's title
  - Price
  - Store

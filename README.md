# AllKeyShop/IsThereAnyDeal-Scraper
Simple AKS/ITAD.

# Available endpoints:
  - /allkeyshop/:title
  - /allkeyshop/search/:title
  - /allkeyshop/top/:platform
  - /isthereanydeal/search/:title
  
  When looking up details for a specific game on AllKeyShop.

    /allkeyshop/:title
Returns:
  - Game's title
  - Score
  - Amount of reviews
  - Stores available on
  - Platform aswell as region
  - Edition
  - Prices
  - Coupon code if available
  - URL to the store in question

# When searching for a game on AllKeyShop.

    /allkeyshop/search/:title
Returns:
  - Game's title
  - Details such as release year and genre
  - Price
  - Image
  
# When searching for a game on IsThereAnyDeal.

    /isthereanydeal/search/:title 
Returns:
  - Game's title
  - Current price
  - Store where the current price is available
  - Historical low price
  - Store where the historical low price was available
  
# When searching for the top 25 sellers on AllKeyShop, a platform must be included. These must be xbox, playstation, nintendo or pc.
    
    /allkeyshop/top/:platform
Returns:
  - Game's title
  - Price
  - Store

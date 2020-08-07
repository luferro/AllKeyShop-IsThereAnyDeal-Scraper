# AllKeyShop/IsThereAnyDeal-Scraper
Simple AKS/ITAD.

# Table of Contents

  - [Installation](#installation)
  - [Endpoints](#endpoints)

# Installation

To install all the necessary dependencies
```sh
npm install
```

# Endpoints:
  - /allkeyshop/:title
  - /allkeyshop/search/:title
  - /allkeyshop/top/:platform
  - /isthereanydeal/search/:title
  
<p align="center">When looking up details for a specific game on AllKeyShop.</p>
```sh
/allkeyshop/:title
```
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

<p align="center">When searching for a game on AllKeyShop.</p>
```sh
/allkeyshop/search/:title
```
Returns:
  - Game's title
  - Details such as release year and genre
  - Price
  - Image
  
<p align="center">When searching for a game on IsThereAnyDeal.</p>
```sh
/isthereanydeal/search/:title 
```
Returns:
  - Game's title
  - Current price
  - Store where the current price is available
  - Historical low price
  - Store where the historical low price was available
  
<p align="center">When searching for the top 25 sellers on AllKeyShop, a platform must be included. These must be xbox, playstation, nintendo or pc.</p>
```sh
/allkeyshop/top/:platform
```
Returns:
  - Game's title
  - Price
  - Store

# AllKeyShop/IsThereAnyDeal-Scraper
Simple AKS/ITAD Scraper.

# Table of Contents

  - [Installation](#installation)
  - [Running](#running)
  - [Endpoints](#endpoints)

# Installation

To install all the necessary dependencies
```sh
npm install
```

# Usage

To run it
```sh
node server.js
```

# Endpoints:
 AllKeyShop
  - /allkeyshop/:title
  - /allkeyshop/search/:title
  - /allkeyshop/top/:platform
  
 IsThereAnyDeal
  - /isthereanydeal/:title
  - /isthereanydeal/search/:title
  
#### When looking up details for a specific game on AllKeyShop.

```sh
/allkeyshop/:title
```
Returns:
  - Game's title
  - Score
  - Amount of reviews
  - Stores
  - Platforms
  - Edition
  - Prices
  - Coupon code if available
  - URL to the store in question

#### When searching for a game on AllKeyShop.

```sh
/allkeyshop/search/:title
```
Returns:
  - Game's title
  - Details such as release year and genre
  - Price
  - Image
  
#### When searching for a game on IsThereAnyDeal.

```sh
/isthereanydeal/search/:title 
```
Returns:
  - Game's title
  - Current price
  - Store where the current price was available
  - Historical lowest price
  - Store where the historical low price was available
  
#### When searching for the top 25 sellers on AllKeyShop, a platform must be included. These must be xbox, playstation, nintendo or pc.

```sh
/allkeyshop/top/:platform
```
Returns:
  - Game's title
  - Price
  - Store

#### When looking up details for a specific game on IsThereAnyDeal.

```sh
/isthereanydeal/:title
```
Returns:
  - Rank
  - Game's title
  - Release date
  - Description
  - Image
  - Stores
  - Platforms
  - Price cut %
  - Current price
  - Historical lowest price
  - Regular price

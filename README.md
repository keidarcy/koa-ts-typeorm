[db](https://dbdiagram.io/d/5fea9c4d9a6c525a03bc8956)

```dbdaigram
Table users as U {
  id int [pk, increment] // auto-increment
  name varchar
  email varchar
  planId number [ref: > plans.id]
  createdAt datetime [default: `now()`]
  updatedAt datetime [default: `now()`]
  deletedAt datetime [default: null]
}

Table charges {
  id int [pk, increment] // auto-increment
  userId int [ref: > users.id]
  planId int [ref: > plans.id]
  shopifyChargeId int
  test tinyint [note: '1 or 0']
  status string // ACTIVE or  CANCELLED
  name string
  terms string
  type varchar
  price decimal
  cappedAmount decimal
  trialDays int
  billingOn timestamp
  activatedOn timestamp
  trialEndsOn timestamp
  cancelledOn timestamp
  expiresOn timestamp
  description varchar
  referenceCharge int
  createdAt datetime
  updatedAt datetime
  deletedAt datetime

}

Table plans as P{
  id int
  type string
  name string
  price int
  cappedAmount decimal
  terms varchar
  trialDays int
  test tinyint [note: '1 or 0']
  onInstall tinyint [note: '1 or 0']
  createdAt datetime
  updatedAt datetime
}



Table settings {
  id int
  userId int [ref: > users.id]
  alsoBought boolean
  abTitle var [default: "People who bought this product, also bought"]
  newestProducts boolean
  npTitle var [default: "Newest Products"]
  recentlyViewedProducts boolean
  rvpTitle var [default: "Recently Viewed Products"]
  bestSellingProducts boolean
  bspTitle var [default: "Best Selling Products"]
  relatedProducts boolean
  rpTitle var [default: "Related Products"]
  manualRecommend boolean
  mrTitle var [default: "MANUAL RECOMMENDATIONS", note: 'show mutiple manual products list with our other app']
}

Table designs {
  id int
  settingId int [ref: > settings.id]
  showCart boolean
  cartText var [default: "Add to cart"]
  cartColor var [default: "#86b46"]
  showRatingStar boolean [note: 'You can enable this feature if Product Reviews app by Shopify is installed.']
  enableZoomEffect boolean
  enableSlideshow boolean
  showVariant boolean
  showPrice boolean
  cropImage boolean
}

```

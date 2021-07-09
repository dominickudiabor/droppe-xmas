# Christmas shopping list 🎄

## Installation

You should use either `npm` or `yarn` but not both. It's recommeded to use `yarn`

yarn start

##Preview
https://christmast-list-droppe.netlify.app

##Abstract
You’re building an intuitive cart approval process for parents. That is, a flow with high usability for an imaginary christmas gift picking marketplace. The primary user persona of your interface will be a 50 year old parent with differing (usually low) levels of tech nativeness.

##Implementation
Pull 5 carts from the API—one per child, it should be visible which cart is which childs’
The user can interact with these carts in an intuitive way to manage spending and other possible aspects that are important for decision making
The user should get a discount if there are identical products on different childrens carts and the user approves these wishes
2 identical products chosen => 20% reduction for the sum of those two items

3 identical products chosen => 30% reduction … and so on—these reduction rules are to be saved and handled on the client, the API doesn’t support this
When the user has made the final choices of approving certain products, these choices should be pushed to the API. Save both approved and discarded carts per child to the API
The user should see a final confirmation screen with an easy overview of the new data saved on the API—aggregated approved cart with possible relating savings as well as an aggregate disregarded cart overview

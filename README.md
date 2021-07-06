## Installation

You should use either `npm` or `yarn` but not both. It's recommeded to use `yarn`

yarn start

# Christmas shopping list s🎄

Abstract
You’re building an intuitive cart approval process for parents. That is, a flow with high usability for an imaginary christmas gift picking marketplace. The primary user persona of your interface will be a 50 year old parent with differing (usually low) levels of tech nativeness.
Story
Imagine you’re the parent of 5 children. It’s just before christmas. Your children have each collected a wish list of gifts (products for which you will pay for) in a service called Droppe Xmas 🎄—these carts or wish lists are represented by a `cart` in fakestoreapi.com/docs. You want to be able to approve some of these gift wishes and discard some. In other words, one easy interface & approval flow for aggregating all 5 wish lists.

As a parent (user) you might have different ways to decide what the main criteria is for approving or discarding a gift—to optimize savings, optimize for everyone to get their favourite gifts, optimize that all children will get an equal amount of gifts, optimising that their well behaved child will get more gifts than others. As developers and designers we cannot be sure what these exact decision processes are—the user could even approve or discard all wishes. However, we’ve identified that controlling spend is one of the most important factors and relating features should therefore be emphasized when building these interfaces.
Implementation
Pull 5 carts from the API—one per child, it should be visible which cart is which childs’
The user can interact with these carts in an intuitive way to manage spending and other possible aspects that are important for decision making
The user should get a discount if there are identical products on different childrens carts and the user approves these wishes
2 identical products chosen => 20% reduction for the sum of those two items

3 identical products chosen => 30% reduction … and so on—these reduction rules are to be saved and handled on the client, the API doesn’t support this
When the user has made the final choices of approving certain products, these choices should be pushed to the API. Save both approved and discarded carts per child to the API
The user should see a final confirmation screen with an easy overview of the new data saved on the API—aggregated approved cart with possible relating savings as well as an aggregate disregarded cart overview
Keep in mind the different criteria for optimisation depending on user personas

Estimated workload: 5 hours

Keep these things in mind
Data abstraction in application & state
Modularity of code (reusable patterns, components)
Client-server data transfer frugality (when are we fetching what and why)
Automated testing (what is valuable to test and how)

What we value
Prioritization, recognise what’s actually valuable
Clean code, code quality, modularity & scalability
Usability, translate requirements into features & flows, utilize patterns & atomic design
Confidence, ability to clearly justify the reasoning behind your choices

Fake Production API: https://fakestoreapi.com/, handle this api and it’s documentation as it would be our production grade api—that is, the code should handle it in the same way as in a production environment and its interactions should be tested as such.

Limitations: The interface is highly usable, aesthetic, and designed user-first without using any external UI library or CSS framework.

Recommend Technologies: Nextjs, React, Typescript, css preprocessor for styling. Using create next or create react app as boilerplate is allowed.

Final tips: Submit the assignment by sending (as a reply to the email you received) us a link to the Github repository and make sure we can access it. Remember to include a README.md with instructions to get the application running. Double check everything before returning the code.

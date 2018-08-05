## Dependencies

# server dependencies
run `npm install`.

# client dependencies
run `npm run client-install`.


## DB
change value of `mongoURI` in `server/config/db.js`. (for this test I use mLAB as my mongodb database);


## Development
run server using `npm run server`.


## Models
path `server/models`

# Category Model
`title`: `String`, required
`description`: `String`

# Expense Model
`title`: `String`, required
`val`: `Number`, required
`date`: `Date`, required
`category`: `String`, required


## Routes

# categories
`/categories` (get, post)
`/categories/:id` (put, delete)

# expenses
`/expenses` (get, post)
`/expenses/:id` (put, delete)
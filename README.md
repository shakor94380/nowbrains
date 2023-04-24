#configuration

In product-api set all your env variables by reating the file '.env'

#With docker

docker compose have three services api, db and front
Launch the command ()
- docker-compose build
- docker-compose up

#Local

In local for each project launch the command
- npm run dev (in product-api)
- npm run start (in front-angular)

#API
route list
- POST /accounts : create a new accounts
- POST /accounts/login : login with an existing account
- GET /products : get all products
- GET /products/:id : get an product by is ID
- PATCH /products/:id : update an product by is ID
- DELETE /products/:id : update an product by is ID
- POST /products : create a product
- POST /products/search : search an product by dates, stock, name, price

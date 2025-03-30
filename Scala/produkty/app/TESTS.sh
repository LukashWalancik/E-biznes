# KATEGORIE

# GET
irm "http://localhost:9000/categories"

# POST
irm "http://localhost:9000/categories" `
    -Method POST `
    -ContentType "application/json" `
    -Body '{"id":4, "name":"Zabawki"}' `
    -Headers @{"Content-Type"="application/json"}

# PUT
irm "http://localhost:9000/categories/4" `
    -Method PUT `
    -ContentType "application/json" `
    -Body '{"id":4, "name":"Książki"}' `
    -Headers @{"Content-Type"="application/json"}

# DELETE
irm "http://localhost:9000/categories/4" -Method DELETE



# PRODUKTY

# GET
irm "http://localhost:9000/products"
irm "http://localhost:9000/products/category/1"


# POST
irm "http://localhost:9000/products" `
    -Method POST `
    -ContentType "application/json" `
    -Body '{"id":6, "name":"Odtwarzacz DVD", "price":500, "categoryId":2}' `
    -Headers @{"Content-Type"="application/json"}

# DELETE
irm "http://localhost:9000/products/4" -Method DELETE



# KOSZYK
# POST
irm -Uri "http://localhost:9000/cart" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"productId": 1, "quantity": 2}'


# POST
irm "http://localhost:9000/cart" `
    -Method POST `
    -ContentType "application/json" `
    -Body '{"id":6, "name":"Odtwarzacz DVD", "price":500, "categoryId":2}' `
    -Headers @{"Content-Type"="application/json"}

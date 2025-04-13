irm "http://localhost:1323/categories/seed" -Method POST 
irm "http://localhost:1323/books/seed" -Method POST







irm "http://localhost:1323/categories" -Method GET
irm "http://localhost:1323/books" -Method GET

irm "http://localhost:1323/category" -Method POST -ContentType "application/json" -Body '{"name": "Przygodowe"}' -Headers @{"Content-Type"="application/json"}
irm "http://localhost:1323/categories" -Method GET

irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "W pustyni i w puszczy", "author":"Henryk Sienkiewicz", "price": 18.99 , "category_id": 5}' -Headers @{"Content-Type"="application/json"}
irm "http://localhost:1323/books" -Method GET

irm "http://localhost:1323/cart/7/1" -Method POST
irm "http://localhost:1323/cart" -Method GET

irm "http://localhost:1323/cart/6/2" -Method POST
irm "http://localhost:1323/cart" -Method GET
irm "http://localhost:1323/cart/totalprice" -Method GET


irm "http://localhost:1323/books/filtered?author=Henryk%20Sienkiewicz" -Method GET

irm "http://localhost:1323/books/filtered?author=Henryk%20Sienkiewicz&maxPrice=40" -Method GET
irm "http://localhost:1323/category" -Method POST -ContentType "application/json" -Body '{"name": "NAZWA"}' -Headers @{"Content-Type"="application/json"}

irm "http://localhost:1323/category" -Method POST -ContentType "application/json" -Body '{"name": "Kryminal"}' -Headers @{"Content-Type"="application/json"}

irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "Nielegalni", "author":"Vincent V. Severski", "price": 33.99 , "category_id": 5}' -Headers @{"Content-Type"="application/json"}

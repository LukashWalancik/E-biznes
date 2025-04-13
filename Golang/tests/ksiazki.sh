# GET
irm "http://localhost:1323/books" -Method GET
irm "http://localhost:1323/books/[ID]" -Method GET
irm "http://localhost:1323/books/4" -Method GET



# POST
irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "TYTUŁ", "author": "AUTOR", "price": "CENA"}' -Headers @{"Content-Type"="application/json"}
irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "Przeminęło z wiatrem", "author":"Margaret Mitchell", "price": 59.99}' -Headers @{"Content-Type"="application/json"}
irm "http://localhost:1323/books/seed" -Method POST 

irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "Przeminęło z wiatrem", "author":"Margaret Mitchell", "price": 59.99, "category_id": 2}' -Headers @{"Content-Type"="application/json"}

# PUT
irm "http://localhost:1323/books/[ID]" -Method PUT -ContentType "application/json" -Body '{"title": "TYTUŁ", "author":"AUTOR", "price": "CENA"}' -Headers @{"Content-Type"="application/json"}
irm "http://localhost:1323/books/1" -Method PUT -ContentType "application/json" -Body '{"title": "Drużyna Pierścienia", "author":"J.R.R. Tolkien", "price": 34.99}' -Headers @{"Content-Type"="application/json"}

# DELETE
irm "http://localhost:1323/books/[ID]" -Method DELETE
irm "http://localhost:1323/books/2" -Method DELETE

irm "http://localhost:1323/books/clear" -Method DELETE




irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "Potop", "author":"Henryk Sienkiewicz"}' -Headers @{"Content-Type"="application/json"}


irm "http://localhost:1323/books/19" -Method PUT -ContentType "application/json" -Body '{"title": "Nexus", "author":"Yuval Noah Harari", "price": 100}' -Headers @{"Content-Type"="application/json"}

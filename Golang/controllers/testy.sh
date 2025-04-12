# GET
irm "http://localhost:1323/books" -Method GET
irm "http://localhost:1323/books/[ID]" -Method GET
irm "http://localhost:1323/books/4" -Method GET



# POST
irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "TYTUŁ", "author":"AUTOR"}' -Headers @{"Content-Type"="application/json"}
irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "Przeminęło z wiatrem", "author":"Margaret Mitchell"}' -Headers @{"Content-Type"="application/json"}
irm "http://localhost:1323/books/seed" -Method POST 

# PUT
irm "http://localhost:1323/books/[ID]" -Method PUT -ContentType "application/json" -Body '{"title": "TYTUŁ", "author":"AUTOR"}' -Headers @{"Content-Type"="application/json"}
irm "http://localhost:1323/books/1" -Method PUT -ContentType "application/json" -Body '{"title": "Drużyna Pierścienia", "author":"J.R.R. Tolkien"}' -Headers @{"Content-Type"="application/json"}

# DELETE
irm "http://localhost:1323/books/[ID]" -Method DELETE
irm "http://localhost:1323/books/2" -Method DELETE

irm "http://localhost:1323/books/clear" -Method DELETE




irm "http://localhost:1323/books" -Method POST -ContentType "application/json" -Body '{"title": "Potop", "author":"Henryk Sienkiewicz"}' -Headers @{"Content-Type"="application/json"}

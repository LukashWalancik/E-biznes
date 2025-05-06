# GET
irm "http://localhost:1323/cart" -Method GET
irm "http://localhost:1323/cart/totalprice" -Method GET

# POST
irm "http://localhost:1323/cart/19/1" -Method POST

# PUT
irm "http://localhost:1323/cart/:cart_id/:new_quantity" -Method PUT
irm "http://localhost:1323/cart/3/1" -Method PUT

# DELETE
cart/:cart_id
irm "http://localhost:1323/cart/cart_id" -Method DELETE
irm "http://localhost:1323/cart/2" -Method DELETE
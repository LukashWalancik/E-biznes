// server.go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"ebiznes/controllers"
	"ebiznes/models"
)

func main() {
	e := echo.New()
	models.Initialize()

	e.GET("/books", controllers.GetBooks)
	e.GET("/books/:id", controllers.GetBook)
	e.POST("/books", controllers.CreateBook)
	e.PUT("/books/:id", controllers.UpdateBook)
	e.DELETE("/books/:id", controllers.DeleteBook)

	e.DELETE("/books/clear", controllers.ClearBooks)
	e.POST("/books/seed", controllers.SeedBooks)

	e.POST("/cart/:book_id/:quantity", controllers.AddBookToCart)
	e.GET("/cart", controllers.GetCart)
	e.GET("/cart/totalprice", controllers.GetTotalPrice)
	e.PUT("/cart/:cart_id/:new_quantity", controllers.UpdateCartItem)
	e.DELETE("/cart/:cart_id", controllers.DeleteCartItem)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello from Bookstore API!")
	})

	e.Logger.Fatal(e.Start(":1323"))
}

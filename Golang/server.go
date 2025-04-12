// server.go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"ebiznes/controllers"
)

func main() {
	e := echo.New()

	e.GET("/books", controllers.GetBooks)
	e.GET("/books/:id", controllers.GetBook)
	e.POST("/books", controllers.CreateBook)
	e.PUT("/books/:id", controllers.UpdateBook)
	e.DELETE("/books/:id", controllers.DeleteBook)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello from Bookstore API!")
	})

	e.Logger.Fatal(e.Start(":1323"))
}

// server.go
package main

import (
	"log"
	"net/http"
	"os"

	"ebiznes/controllers"
	"ebiznes/models"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	models.Initialize()

	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("WARNING: Error loading .env file: %v. Relying on system environment variables.", err)
	}

	if os.Getenv("JWT_SECRET") == "" {
		os.Setenv("JWT_SECRET", "bardzo-tajny-klucz-dla-projektu-studenckiego")
	}

	// auth
	e.POST("/register", controllers.RegisterUser)
	e.POST("/login", controllers.LoginUser)
	e.GET("/auth/google", controllers.GoogleLogin)
	e.GET("/auth/google/callback", controllers.GoogleCallback)

	e.GET("/auth/github", controllers.GithubLogin)
	e.GET("/auth/github/callback", controllers.GithubCallback)

	e.GET("/profile", controllers.GetUserProfile, controllers.AuthMiddleware)

	// books
	e.GET("/books", controllers.GetBooks)
	e.GET("/books/:id", controllers.GetBook)
	e.POST("/books", controllers.CreateBook)
	e.PUT("/books/:id", controllers.UpdateBook)
	e.DELETE("/books/:id", controllers.DeleteBook)
	e.GET("/books/category/:category_id", controllers.GetBooksByCategory)
	e.DELETE("/books/clear", controllers.ClearBooks)
	e.POST("/books/seed", controllers.SeedBooks)
	e.GET("/books/filtered", controllers.GetFilteredBooks)
	// cart
	e.POST("/cart/:book_id/:quantity", controllers.AddBookToCart)
	e.GET("/cart", controllers.GetCart)
	e.GET("/cart/totalprice", controllers.GetTotalPrice)
	e.PUT("/cart/:cart_id/:new_quantity", controllers.UpdateCartItem)
	e.DELETE("/cart/:cart_id", controllers.DeleteCartItem)

	// // category
	e.POST("/category", controllers.CreateCategory)
	e.GET("/categories", controllers.GetCategories)
	e.GET("/category/:id", controllers.GetCategory)
	e.POST("/categories/seed", controllers.SeedCategories)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello from Bookstore API!")
	})

	e.Logger.Fatal(e.Start(":1323"))
}

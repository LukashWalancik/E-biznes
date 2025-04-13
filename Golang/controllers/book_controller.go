// book_controller.go
package controllers

import (
	"ebiznes/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetBooks(c echo.Context) error {
	books, err := models.GetBooks()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error retrieving books")
	}
	return c.JSON(http.StatusOK, books)
}

func GetBook(c echo.Context) error {
	id := c.Param("id")
	book, err := models.GetBookByID(id)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Book not found")
	}
	return c.JSON(http.StatusOK, book)
}

func GetBooksByCategory(c echo.Context) error {
	categoryID := c.Param("category_id")
	categoryIDInt, err := strconv.Atoi(categoryID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid category ID")
	}

	books, err := models.GetBooksByCategory(uint(categoryIDInt))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error retrieving books by category")
	}
	return c.JSON(http.StatusOK, books)
}

func CreateBook(c echo.Context) error {
	var book models.Book
	if err := c.Bind(&book); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid input")
	}

	if book.Category.ID > 0 {
		var category models.Category
		if err := models.DB.First(&category, book.Category.ID).Error; err != nil {
			return c.JSON(http.StatusBadRequest, "Invalid category ID")
		}
	}

	if err := models.CreateBook(&book); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error creating book")
	}
	return c.JSON(http.StatusCreated, book)
}

func UpdateBook(c echo.Context) error {
	id := c.Param("id")
	var updatedBook models.Book
	if err := c.Bind(&updatedBook); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid input")
	}
	if err := models.UpdateBook(id, &updatedBook); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error updating book")
	}
	return c.JSON(http.StatusOK, updatedBook)
}

func DeleteBook(c echo.Context) error {
	id := c.Param("id")
	if err := models.DeleteBook(id); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error deleting book")
	}
	return c.JSON(http.StatusOK, "Book deleted successfully")
}

func ClearBooks(c echo.Context) error {
	if err := models.ClearBooks(); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error clearing books")
	}
	return c.JSON(http.StatusOK, "All books have been cleared")
}

func SeedBooks(c echo.Context) error {
	books := []models.Book{
		{Title: "Dwie Wieze", Author: "J.R.R. Tolkien", Price: 51.99, CategoryID: 1},                 // Fantasy
		{Title: "Sto lat samotnosci", Author: "Gabriel Garcia Marquez", Price: 69.90, CategoryID: 2}, // Klasyka
		{Title: "Nexus", Author: "Yuval Noah Harari", Price: 46.99, CategoryID: 3},                   // Sci-Fi
		{Title: "Ogniem i mieczem", Author: "Henryk Sienkiewicz", Price: 37.99, CategoryID: 4},       // Historia
		{Title: "Potop", Author: "Henryk Sienkiewicz", Price: 32.99, CategoryID: 4},                  // Historia
		{Title: "Pan Wolodyjowski", Author: "Henryk Sienkiewicz", Price: 41.77, CategoryID: 4},       // Historia
	}

	for _, book := range books {
		if err := models.CreateBook(&book); err != nil {
			return c.JSON(http.StatusInternalServerError, "Error seeding books")
		}
	}
	return c.JSON(http.StatusOK, "Books have been seeded")
}

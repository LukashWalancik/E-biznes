// book_controller.go
package controllers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Book struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
}

var books = []Book{
	{ID: 1, Title: "Władca Pierścieni", Author: "J.R.R. Tolkien"},
	{ID: 2, Title: "Sto lat samotności", Author: "Gabriel García Márquez"},
	{ID: 3, Title: "Nexus", Author: "Yuval Noah Harari"},
	{ID: 4, Title: "Ogniem i mieczem", Author: "Henryk Sienkiewicz"},
	{ID: 5, Title: "Potop", Author: "Henryk Sienkiewicz"},
	{ID: 6, Title: "Pan Wołodyjowski", Author: "Henryk Sienkiewicz"},
}

func GetBooks(c echo.Context) error {
	return c.JSON(http.StatusOK, books)
}

func GetBook(c echo.Context) error {
	idParam := c.Param("id")
	for _, b := range books {
		if fmt.Sprintf("%d", b.ID) == idParam {
			return c.JSON(http.StatusOK, b)
		}
	}
	return c.JSON(http.StatusNotFound, echo.Map{"message": "Book not found"})
}

func CreateBook(c echo.Context) error {
	var newBook Book
	if err := c.Bind(&newBook); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
	}

	newBook.ID = getNextID()
	books = append(books, newBook)

	return c.JSON(http.StatusCreated, newBook)
}

func getNextID() int {
	maxID := 0
	for _, b := range books {
		if b.ID > maxID {
			maxID = b.ID
		}
	}
	return maxID + 1
}

func UpdateBook(c echo.Context) error {
	idParam := c.Param("id")
	for i, b := range books {
		if fmt.Sprintf("%d", b.ID) == idParam {
			var updated Book
			if err := c.Bind(&updated); err != nil {
				return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
			}
			updated.ID = b.ID // zachowaj stare ID
			books[i] = updated
			return c.JSON(http.StatusOK, updated)
		}
	}
	return c.JSON(http.StatusNotFound, echo.Map{"message": "Book not found"})
}

func DeleteBook(c echo.Context) error {
	idParam := c.Param("id")
	for i, b := range books {
		if fmt.Sprintf("%d", b.ID) == idParam {
			books = append(books[:i], books[i+1:]...)
			return c.JSON(http.StatusOK, echo.Map{"message": "Book deleted"})
		}
	}
	return c.JSON(http.StatusNotFound, echo.Map{"message": "Book not found"})
}

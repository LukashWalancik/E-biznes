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

func GetFilteredBooks(c echo.Context) error {
	var categoryID *uint
	var author *string
	var maxPrice *float64

	if cid := c.QueryParam("category_id"); cid != "" {
		if parsed, err := strconv.Atoi(cid); err == nil {
			id := uint(parsed)
			categoryID = &id
		}
	}

	if a := c.QueryParam("author"); a != "" {
		author = &a
	}

	if p := c.QueryParam("max_price"); p != "" {
		if parsed, err := strconv.ParseFloat(p, 64); err == nil {
			maxPrice = &parsed
		}
	}

	books, err := models.GetFilteredBooks(categoryID, author, maxPrice)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error retrieving filtered books")
	}
	return c.JSON(http.StatusOK, books)
}

// package controllers

// import (
// 	"net/http"
// 	"strconv"
// 	"strings"
// 	"sync"

// 	"github.com/labstack/echo/v4"
// )

// // Structs for Book and Category
// type Category struct {
// 	ID   uint   `json:"id"`
// 	Name string `json:"name"`
// }

// type Book struct {
// 	ID         uint     `json:"id"`
// 	Title      string   `json:"title"`
// 	Author     string   `json:"author"`
// 	Price      float64  `json:"price"`
// 	CategoryID uint     `json:"category_id"`
// 	Category   *Category `json:"category,omitempty"` // Optional nested category
// }

// // In-memory storage
// var (
// 	mockBooks     = []Book{}
// 	nextBookID    uint = 1
// 	mockBookMutex      = &sync.Mutex{}
// )

// // ===== Controller Functions =====

// func GetBooks(c echo.Context) error {
// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	return c.JSON(http.StatusOK, mockBooks)
// }

// func GetBook(c echo.Context) error {
// 	id := c.Param("id")
// 	bookID, err := strconv.Atoi(id)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, "Invalid book ID")
// 	}

// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	for _, book := range mockBooks {
// 		if book.ID == uint(bookID) {
// 			return c.JSON(http.StatusOK, book)
// 		}
// 	}
// 	return c.JSON(http.StatusNotFound, "Book not found")
// }

// func GetBooksByCategory(c echo.Context) error {
// 	categoryID := c.Param("category_id")
// 	cid, err := strconv.Atoi(categoryID)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, "Invalid category ID")
// 	}

// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	var filtered []Book
// 	for _, book := range mockBooks {
// 		if book.CategoryID == uint(cid) {
// 			filtered = append(filtered, book)
// 		}
// 	}
// 	return c.JSON(http.StatusOK, filtered)
// }

// func CreateBook(c echo.Context) error {
// 	var book Book
// 	if err := c.Bind(&book); err != nil {
// 		return c.JSON(http.StatusBadRequest, "Invalid input")
// 	}

// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	book.ID = nextBookID
// 	nextBookID++
// 	mockBooks = append(mockBooks, book)

// 	return c.JSON(http.StatusCreated, book)
// }

// func UpdateBook(c echo.Context) error {
// 	id := c.Param("id")
// 	bookID, err := strconv.Atoi(id)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, "Invalid book ID")
// 	}

// 	var updatedBook Book
// 	if err := c.Bind(&updatedBook); err != nil {
// 		return c.JSON(http.StatusBadRequest, "Invalid input")
// 	}

// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	for i, book := range mockBooks {
// 		if book.ID == uint(bookID) {
// 			updatedBook.ID = book.ID // Keep the same ID
// 			mockBooks[i] = updatedBook
// 			return c.JSON(http.StatusOK, updatedBook)
// 		}
// 	}
// 	return c.JSON(http.StatusNotFound, "Book not found")
// }

// func DeleteBook(c echo.Context) error {
// 	id := c.Param("id")
// 	bookID, err := strconv.Atoi(id)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, "Invalid book ID")
// 	}

// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	for i, book := range mockBooks {
// 		if book.ID == uint(bookID) {
// 			mockBooks = append(mockBooks[:i], mockBooks[i+1:]...)
// 			return c.JSON(http.StatusOK, "Book deleted successfully")
// 		}
// 	}
// 	return c.JSON(http.StatusNotFound, "Book not found")
// }

// func ClearBooks(c echo.Context) error {
// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	mockBooks = []Book{}
// 	nextBookID = 1

// 	return c.JSON(http.StatusOK, "All books have been cleared")
// }

// func SeedBooks(c echo.Context) error {
// 	seed := []Book{
// 		{Title: "Dwie Wieze", Author: "J.R.R. Tolkien", Price: 51.99, CategoryID: 1},
// 		{Title: "Sto lat samotnosci", Author: "Gabriel Garcia Marquez", Price: 69.90, CategoryID: 2},
// 		{Title: "Nexus", Author: "Yuval Noah Harari", Price: 46.99, CategoryID: 3},
// 		{Title: "Ogniem i mieczem", Author: "Henryk Sienkiewicz", Price: 37.99, CategoryID: 4},
// 		{Title: "Potop", Author: "Henryk Sienkiewicz", Price: 32.99, CategoryID: 4},
// 		{Title: "Pan Wolodyjowski", Author: "Henryk Sienkiewicz", Price: 41.77, CategoryID: 4},
// 	}

// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	for _, book := range seed {
// 		book.ID = nextBookID
// 		nextBookID++
// 		mockBooks = append(mockBooks, book)
// 	}

// 	return c.JSON(http.StatusOK, "Books have been seeded")
// }

// func GetFilteredBooks(c echo.Context) error {
// 	var categoryID *uint
// 	var author *string
// 	var maxPrice *float64

// 	if cid := c.QueryParam("category_id"); cid != "" {
// 		if parsed, err := strconv.Atoi(cid); err == nil {
// 			id := uint(parsed)
// 			categoryID = &id
// 		}
// 	}
// 	if a := c.QueryParam("author"); a != "" {
// 		trimmed := strings.TrimSpace(a)
// 		author = &trimmed
// 	}
// 	if p := c.QueryParam("max_price"); p != "" {
// 		if parsed, err := strconv.ParseFloat(p, 64); err == nil {
// 			maxPrice = &parsed
// 		}
// 	}

// 	mockBookMutex.Lock()
// 	defer mockBookMutex.Unlock()

// 	var filtered []Book
// 	for _, book := range mockBooks {
// 		if categoryID != nil && book.CategoryID != *categoryID {
// 			continue
// 		}
// 		if author != nil && !strings.Contains(strings.ToLower(book.Author), strings.ToLower(*author)) {
// 			continue
// 		}
// 		if maxPrice != nil && book.Price > *maxPrice {
// 			continue
// 		}
// 		filtered = append(filtered, book)
// 	}
// 	return c.JSON(http.StatusOK, filtered)
// }

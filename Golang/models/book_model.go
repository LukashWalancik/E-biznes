// book_model.go
package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Book - model książki
type Book struct {
	ID     uint   `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
}

var DB *gorm.DB

func Initialize() {
	var err error
	DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	DB.AutoMigrate(&Book{})
}

func GetBooks() ([]Book, error) {
	var books []Book
	if err := DB.Find(&books).Error; err != nil {
		return nil, err
	}
	return books, nil
}

func GetBookByID(id string) (*Book, error) {
	var book Book
	if err := DB.First(&book, id).Error; err != nil {
		return nil, err
	}
	return &book, nil
}

func CreateBook(book *Book) error {
	return DB.Create(book).Error
}

func UpdateBook(id string, updatedBook *Book) error {
	var book Book
	if err := DB.First(&book, id).Error; err != nil {
		return err
	}
	book.Title = updatedBook.Title
	book.Author = updatedBook.Author
	return DB.Save(&book).Error
}

func DeleteBook(id string) error {
	return DB.Delete(&Book{}, id).Error
}

func ClearBooks() error {
	return DB.Exec("DELETE FROM books").Error
}

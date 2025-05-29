// book_model.go
package models

import "gorm.io/gorm"

type Book struct {
	ID         uint     `json:"id"`
	Title      string   `json:"title"`
	Author     string   `json:"author"`
	Price      float64  `json:"price"`
	CategoryID uint     `json:"category_id"`
	Category   Category `json:"category" gorm:"foreignKey:CategoryID"`
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

func GetBooksByCategory(categoryID uint) ([]Book, error) {
	var books []Book
	if err := DB.Where("category_id = ?", categoryID).Find(&books).Error; err != nil {
		return nil, err
	}
	return books, nil
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
	book.Price = updatedBook.Price
	book.CategoryID = updatedBook.CategoryID
	return DB.Save(&book).Error
}

func DeleteBook(id string) error {
	return DB.Delete(&Book{}, id).Error
}

func ClearBooks() error {
	return DB.Exec("DELETE FROM books").Error
}

func ByCategory(categoryID uint) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("category_id = ?", categoryID)
	}
}

func ByAuthor(author string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("author = ?", author)
	}
}

func CheaperThan(price float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price < ?", price)
	}
}

func GetFilteredBooks(categoryID *uint, author *string, maxPrice *float64) ([]Book, error) {
	var books []Book
	query := DB.Model(&Book{})

	if categoryID != nil {
		query = query.Scopes(ByCategory(*categoryID))
	}
	if author != nil {
		query = query.Scopes(ByAuthor(*author))
	}
	if maxPrice != nil {
		query = query.Scopes(CheaperThan(*maxPrice))
	}

	if err := query.Find(&books).Error; err != nil {
		return nil, err
	}
	return books, nil
}

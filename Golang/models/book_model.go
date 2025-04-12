// book_model.go
package models

type Book struct {
	ID     uint    `json:"id"`
	Title  string  `json:"title"`
	Author string  `json:"author"`
	Price  float64 `json:"price"`
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
	book.Price = updatedBook.Price
	return DB.Save(&book).Error
}

func DeleteBook(id string) error {
	return DB.Delete(&Book{}, id).Error
}

func ClearBooks() error {
	return DB.Exec("DELETE FROM books").Error
}

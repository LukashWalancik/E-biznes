// cart_model.go
package models

import "fmt"

type Cart struct {
	ID         uint    `json:"id"`
	BookID     uint    `json:"book_id"`
	Quantity   int     `json:"quantity"`
	TotalPrice float64 `json:"total_price"`
}

func AddBookToCart(bookID uint, quantity int) error {
	var book Book
	if err := DB.First(&book, bookID).Error; err != nil {
		return err
	}

	var cartItem Cart
	err := DB.Where("book_id = ?", bookID).First(&cartItem).Error
	if err == nil {
		cartItem.Quantity += quantity
		cartItem.TotalPrice = float64(cartItem.Quantity) * book.Price
		return DB.Save(&cartItem).Error
	} else if err.Error() == "record not found" {
		cartItem = Cart{
			BookID:     bookID,
			Quantity:   quantity,
			TotalPrice: float64(quantity) * book.Price,
		}
		return DB.Create(&cartItem).Error
	}

	return err
}

func GetCart() ([]Cart, error) {
	var cartItems []Cart
	if err := DB.Find(&cartItems).Error; err != nil {
		return nil, err
	}
	return cartItems, nil
}

func GetTotalPrice() (float64, error) {
	var cartItems []Cart
	if err := DB.Find(&cartItems).Error; err != nil {
		return 0, err
	}
	var totalPrice float64
	for _, item := range cartItems {
		totalPrice += item.TotalPrice
	}
	return totalPrice, nil
}

func UpdateCartItem(cartID uint, newQuantity int) error {
	if newQuantity <= 0 {
		return fmt.Errorf("quantity must be greater than 0")
	}

	var cartItem Cart
	if err := DB.First(&cartItem, cartID).Error; err != nil {
		return err
	}

	var book Book
	if err := DB.First(&book, cartItem.BookID).Error; err != nil {
		return err
	}

	cartItem.Quantity = newQuantity
	cartItem.TotalPrice = float64(cartItem.Quantity) * book.Price

	return DB.Save(&cartItem).Error
}

func DeleteCartItem(cartID uint) error {
	if err := DB.Delete(&Cart{}, cartID).Error; err != nil {
		return err
	}
	return nil
}

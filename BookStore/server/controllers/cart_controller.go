// cart_controller.go
package controllers

import (
	"ebiznes/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func AddBookToCart(c echo.Context) error {
	bookID := c.Param("book_id")
	quantity := c.Param("quantity")

	bookIDInt, err := strconv.Atoi(bookID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid book ID")
	}
	quantityInt, err := strconv.Atoi(quantity)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid quantity")
	}

	if err := models.AddBookToCart(uint(bookIDInt), quantityInt); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error adding book to cart")
	}

	return c.JSON(http.StatusOK, "Book added to cart")
}

func GetCart(c echo.Context) error {
	cartItems, err := models.GetCart()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error retrieving cart items")
	}
	return c.JSON(http.StatusOK, cartItems)
}

func GetTotalPrice(c echo.Context) error {
	totalPrice, err := models.GetTotalPrice()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error calculating total price")
	}
	return c.JSON(http.StatusOK, totalPrice)
}

func UpdateCartItem(c echo.Context) error {
	cartID := c.Param("cart_id")
	newQuantity := c.Param("new_quantity")

	cartIDInt, err := strconv.Atoi(cartID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid cart ID")
	}
	quantityInt, err := strconv.Atoi(newQuantity)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid quantity")
	}

	if err := models.UpdateCartItem(uint(cartIDInt), quantityInt); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error updating cart item")
	}

	return c.JSON(http.StatusOK, "Cart item updated successfully")
}

func DeleteCartItem(c echo.Context) error {
	cartID := c.Param("cart_id")

	cartIDInt, err := strconv.Atoi(cartID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid cart ID")
	}

	if err := models.DeleteCartItem(uint(cartIDInt)); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error deleting cart item")
	}

	return c.JSON(http.StatusOK, "Cart item deleted successfully")
}

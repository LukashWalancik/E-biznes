// category_controller.go
package controllers

import (
	"ebiznes/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func CreateCategory(c echo.Context) error {
	var category models.Category
	if err := c.Bind(&category); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid input")
	}
	if err := models.CreateCategory(&category); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error creating category")
	}
	return c.JSON(http.StatusCreated, category)
}

func GetCategories(c echo.Context) error {
	categories, err := models.GetCategories()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error retrieving categories")
	}
	return c.JSON(http.StatusOK, categories)
}

func GetCategory(c echo.Context) error {
	id := c.Param("id")
	categoryID, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid category ID")
	}
	category, err := models.GetCategoryByID(uint(categoryID))
	if err != nil {
		return c.JSON(http.StatusNotFound, "Category not found")
	}
	return c.JSON(http.StatusOK, category)
}

func SeedCategories(c echo.Context) error {
	categories := []models.Category{
		{Name: "Fantasy"},
		{Name: "Klasyka"},
		{Name: "Sci-Fi"},
		{Name: "Historia"},
	}

	for _, category := range categories {
		if err := models.DB.Create(&category).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, "Error seeding categories")
		}
	}
	return c.JSON(http.StatusOK, "Categories have been seeded")
}

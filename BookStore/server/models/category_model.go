// category_model.go
package models

type Category struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

func CreateCategory(category *Category) error {
	return DB.Create(category).Error
}

func GetCategories() ([]Category, error) {
	var categories []Category
	if err := DB.Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}

func GetCategoryByID(id uint) (*Category, error) {
	var category Category
	if err := DB.First(&category, id).Error; err != nil {
		return nil, err
	}
	return &category, nil
}

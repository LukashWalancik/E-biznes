// models/initialize.go (lub inny plik w models)
package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// Initialize - funkcja inicjalizująca bazę danych
func Initialize() {
	var err error
	DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Automatyczna migracja dla modeli Book i Cart
	err = DB.AutoMigrate(&Book{}, &Cart{})
	if err != nil {
		panic("failed to migrate tables")
	}
}

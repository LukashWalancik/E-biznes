// models/user.go
package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `gorm:"unique;not null" json:"email"`
	Password  string    `gorm:""`
	Street    string    `json:"street"`
	City      string    `json:"city"`
	ZipCode   string    `json:"zip_code"`
	GoogleID  string    `gorm:"uniqueIndex"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		u.Password = string(hashedPassword)
	}
	return nil
}

func (u *User) CheckPassword(password string) bool {
	if u.Password == "" {
		return false
	}
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

func CreateUser(user *User) error {
	return DB.Create(user).Error
}

func FindUserByEmail(email string) (*User, error) {
	var user User
	err := DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func FindOrCreateUserByGoogleID(googleID, email, firstName, lastName string) (*User, error) {
	var user User
	err := DB.Where("google_id = ?", googleID).First(&user).Error
	if err == nil {
		return &user, nil
	}

	err = DB.Where("email = ?", email).First(&user).Error
	if err == nil {
		user.GoogleID = googleID
		return &user, DB.Save(&user).Error
	}

	newUser := User{
		GoogleID:  googleID,
		Email:     email,
		FirstName: firstName,
		LastName:  lastName,
	}
	err = DB.Create(&newUser).Error
	if err != nil {
		return nil, err
	}
	return &newUser, nil
}

func GetUserByID(id uint) (*User, error) {
	var user User
	err := DB.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

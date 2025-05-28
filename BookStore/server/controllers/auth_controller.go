// controllers/auth_controller.go
package controllers

import (
	"ebiznes/models"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func init() {
	if len(jwtSecret) == 0 {
		fmt.Println("WARNING: JWT_SECRET environment variable not set. Using a default insecure key.")
		jwtSecret = []byte("super-tajny-klucz-dla-projektu-studenckiego-zmien-to-koniecznie")
	}
}

type UserClaims struct {
	UserID uint `json:"user_id"`
	jwt.RegisteredClaims
}

func generateJWT(userID uint) (string, error) {
	claims := &UserClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", fmt.Errorf("failed to sign token: %w", err)
	}
	return tokenString, nil
}

func RegisterUser(c echo.Context) error {
	var newUser models.User
	if err := c.Bind(&newUser); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid input"})
	}

	if newUser.Email == "" || newUser.Password == "" || newUser.FirstName == "" || newUser.LastName == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Email, password, first name, and last name are required"})
	}

	_, err := models.FindUserByEmail(newUser.Email)
	if err == nil {
		return c.JSON(http.StatusConflict, map[string]string{"message": "User with this email already exists"})
	}

	if err := models.CreateUser(&newUser); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to register user", "error": err.Error()})
	}

	token, err := generateJWT(newUser.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate authentication token"})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"message":    "User registered successfully",
		"token":      token,
		"user_id":    newUser.ID,
		"email":      newUser.Email,
		"first_name": newUser.FirstName,
		"last_name":  newUser.LastName,
	})
}

func LoginUser(c echo.Context) error {
	var credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.Bind(&credentials); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid input"})
	}

	user, err := models.FindUserByEmail(credentials.Email)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid credentials"})
	}

	if !user.CheckPassword(credentials.Password) {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid credentials"})
	}

	token, err := generateJWT(user.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate authentication token"})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message":    "Login successful",
		"token":      token,
		"user_id":    user.ID,
		"email":      user.Email,
		"first_name": user.FirstName,
		"last_name":  user.LastName,
	})
}

func GetUserProfile(c echo.Context) error {
	userID := c.Get("userID").(uint)

	user, err := models.GetUserByID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to retrieve user profile"})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"id":         user.ID,
		"first_name": user.FirstName,
		"last_name":  user.LastName,
		"email":      user.Email,
		"street":     user.Street,
		"city":       user.City,
		"zip_code":   user.ZipCode,
	})
}

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Authorization header required"})
		}

		if len(authHeader) < 7 || authHeader[:7] != "Bearer " {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid Authorization header format"})
		}
		tokenString := authHeader[7:]

		token, err := jwt.ParseWithClaims(tokenString, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtSecret, nil
		})

		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid or expired token", "error": err.Error()})
		}

		claims, ok := token.Claims.(*UserClaims)
		if !ok || !token.Valid {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid token claims"})
		}

		c.Set("userID", claims.UserID)
		return next(c)
	}
}

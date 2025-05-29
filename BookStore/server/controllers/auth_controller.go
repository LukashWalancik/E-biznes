// controllers/auth_controller.go
package controllers

import (
	"context"
	"crypto/rand"
	"ebiznes/models"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
	"google.golang.org/api/people/v1"
)

var jwtSecret []byte
var googleOauthConfig *oauth2.Config
var githubOauthConfig *oauth2.Config

func init() {
	godotenv.Load(".env")
	jwtSecret = []byte(os.Getenv("JWT_SECRET"))
	if len(jwtSecret) == 0 {
		fmt.Println("WARNING: JWT_SECRET environment variable not set. Using a default insecure key.")
		jwtSecret = []byte("bardzo-tajny-klucz-dla-projektu-studenckiego")
	}
	googleOauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URL"),
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}
	if googleOauthConfig.ClientID == "" || googleOauthConfig.ClientSecret == "" || googleOauthConfig.RedirectURL == "" {
		log.Println("WARNING: Google OAuth environment variables not set. Google login will not work.")
		log.Printf("GOOGLE_CLIENT_ID: %s", os.Getenv("GOOGLE_CLIENT_ID"))
		log.Printf("GOOGLE_CLIENT_SECRET: %s", os.Getenv("GOOGLE_CLIENT_SECRET"))
		log.Printf("GOOGLE_REDIRECT_URL (from config): %s", googleOauthConfig.RedirectURL)
		log.Printf("GOOGLE_REDIRECT_URL (from env): %s", os.Getenv("GOOGLE_REDIRECT_URL"))
	}

	githubOauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GITHUB_REDIRECT_URL"),
		Scopes:       []string{"user:email", "read:user"},
		Endpoint:     github.Endpoint,
	}
	if githubOauthConfig.ClientID == "" || githubOauthConfig.ClientSecret == "" || githubOauthConfig.RedirectURL == "" {
		log.Println("WARNING: GitHub OAuth environment variables not set. GitHub login will not work.")
		log.Printf("GITHUB_CLIENT_ID: %s", os.Getenv("GITHUB_CLIENT_ID"))
		log.Printf("GITHUB_CLIENT_SECRET: %s", os.Getenv("GITHUB_CLIENT_SECRET"))
		log.Printf("GITHUB_REDIRECT_URL (from config): %s", githubOauthConfig.RedirectURL)
		log.Printf("GITHUB_REDIRECT_URL (from env): %s", os.Getenv("GITHUB_REDIRECT_URL"))
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
		log.Printf("Błąd bindowania danych użytkownika: %v", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid input"})
	}

	log.Printf("Odebrane dane rejestracji: Email=%s, FirstName=%s, LastName=%s, PasswordLength=%d",
		newUser.Email, newUser.FirstName, newUser.LastName, len(newUser.Password))
	log.Printf("Street: %s, City: %s, ZipCode: %s", newUser.Street, newUser.City, newUser.ZipCode)

	if newUser.Email == "" || newUser.Password == "" || newUser.FirstName == "" || newUser.LastName == "" {
		log.Printf("Walidacja nieudana. Puste pola: Email=%t, Password=%t, FirstName=%t, LastName=%t",
			newUser.Email == "", newUser.Password == "", newUser.FirstName == "", newUser.LastName == "")
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Email, password, first name, and last name are required"})
	}

	_, err := models.FindUserByEmail(newUser.Email)
	if err == nil {
		log.Printf("Próba rejestracji istniejącego użytkownika: %s", newUser.Email)
		return c.JSON(http.StatusConflict, map[string]string{"message": "User with this email already exists"})
	}

	if err := models.CreateUser(&newUser); err != nil {
		log.Printf("Błąd tworzenia użytkownika w bazie danych: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to register user", "error": err.Error()})
	}
	log.Printf("ID nowo zarejestrowanego użytkownika: %d", newUser.ID)
	token, err := generateJWT(newUser.ID)
	if err != nil {
		log.Printf("Błąd generowania JWT dla użytkownika %d: %v", newUser.ID, err)
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

func GoogleLogin(c echo.Context) error {
	state := generateStateOauthCookie(c.Response())
	url := googleOauthConfig.AuthCodeURL(state)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func GoogleCallback(c echo.Context) error {
	state := c.FormValue("state")
	code := c.FormValue("code")

	oauthState, err := c.Cookie("oauthstate")
	if err != nil || oauthState.Value != state {
		log.Printf("Invalid OAuth state: %v", err)
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid OAuth state"})
	}
	c.Response().Header().Del("Set-Cookie")

	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("Code exchange failed: %s", err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to exchange code for token"})
	}

	client := googleOauthConfig.Client(context.Background(), token)
	peopleService, err := people.NewService(context.Background(), option.WithHTTPClient(client))
	if err != nil {
		log.Printf("Failed to create People service: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to get user info"})
	}

	person, err := peopleService.People.Get("people/me").
		PersonFields("names,emailAddresses").Do()
	if err != nil {
		log.Printf("Failed to get user info from Google: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to get user info from Google"})
	}

	var email string
	if len(person.EmailAddresses) > 0 {
		email = person.EmailAddresses[0].Value
	}

	var firstName, lastName string
	if len(person.Names) > 0 {
		firstName = person.Names[0].GivenName
		lastName = person.Names[0].FamilyName
	}
	googleID := person.ResourceName

	if googleID == "" || email == "" {
		log.Printf("Missing GoogleID or Email from Google profile. GoogleID: %s, Email: %s", googleID, email)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Could not retrieve full user profile from Google"})
	}

	user, err := models.FindOrCreateUserByGoogleID(googleID, email, firstName, lastName)
	if err != nil {
		log.Printf("Error finding or creating user by Google ID: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to process user data"})
	}

	jwtToken, err := generateJWT(user.ID)
	if err != nil {
		log.Printf("Failed to generate JWT for Google user: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate authentication token"})
	}

	redirectURL := fmt.Sprintf("http://localhost:3000/auth/callback?token=%s&email=%s&first_name=%s&last_name=%s",
		jwtToken, user.Email, user.FirstName, user.LastName)
	return c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}

func GithubLogin(c echo.Context) error {
	state := generateStateOauthCookie(c.Response())
	url := githubOauthConfig.AuthCodeURL(state)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func generateStateOauthCookie(w http.ResponseWriter) string {
	var expiration = time.Now().Add(20 * time.Minute)
	b := make([]byte, 16)
	_, err := rand.Read(b)
	if err != nil {
		log.Printf("Error generating random state: %v", err)
		return "fallback_insecure_state"
	}
	state := fmt.Sprintf("%x", b)
	cookie := http.Cookie{Name: "oauthstate", Value: state, Expires: expiration, HttpOnly: true}
	http.SetCookie(w, &cookie)
	return state
}

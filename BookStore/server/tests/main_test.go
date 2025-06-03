package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"testing"
)

func TestGetBooksEndpoint(t *testing.T) {
	backendURL := os.Getenv("BACKEND_URL")
	if backendURL == "" {
		t.Skip("BACKEND_URL environment variable not set, skipping test.")
	}

	targetURL := fmt.Sprintf("%s/books", backendURL)

	resp, err := http.Get(targetURL)
	if err != nil {
		t.Fatalf("Failed to send GET request to %s: %v", targetURL, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := ioutil.ReadAll(resp.Body)
		t.Fatalf("Expected status %d for %s, got %d. Body: %s", http.StatusOK, targetURL, resp.StatusCode, string(bodyBytes))
	}

	t.Logf("Successfully received 200 OK from %s", targetURL)
}

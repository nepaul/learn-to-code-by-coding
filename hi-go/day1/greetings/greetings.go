package greetings

import (
	"errors"
	"fmt"
	"math/rand"
	"time"
)

func randomFormat() string {
	formats := []string{
		"Hi, %v. Welcome",
		"Great to see you, %v",
		"Hail, %v! Well met!",
	}

	return formats[rand.Intn(len(formats))]
}

func Hello(name string) (string, error) {
	if name == "" {
		return "", errors.New("empty name")
	}

	// message := fmt.Sprintf("Hello, %s", name)
	message := fmt.Sprintf(randomFormat(), name)
	return message, nil
}

func Hellos(names []string) (map[string]string, error) {
	messages := make(map[string]string)
	for _, name := range names {
		message, err := Hello(name)
		if err != nil {
			return messages, err
		}
		messages[name] = message
	}
	return messages, nil
}

// init sets initial values for variables used in th function.
func init() {
	rand.Seed(time.Now().UnixNano())
}

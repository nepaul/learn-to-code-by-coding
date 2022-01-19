package main

import (
	"fmt"
	"log"

	"example.com/greetings"
)

func main() {
	log.SetPrefix("greetings: ")
	log.SetFlags(0)

	names := []string{"Alice", "Bob", "Charlie"}

	messages, err := greetings.Hellos(names)
	// message, err := greetings.Hello("World")
	// fmt.Println(message)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(messages)
}

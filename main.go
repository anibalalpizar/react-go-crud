package main 

import "fmt"
import "log"
import "github.com/gofiber/fiber/v2"

func main()  {
	app := fiber.New()	
	log.Fatal(app.Listen(":3000"))
}

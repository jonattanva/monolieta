package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"os"
)

type DataSource struct {
	Name     string
	User     string
	Password string
	Filename string
	Host     string
	Port     string
}

func connect(dataSource DataSource) *sql.DB {
	connection := fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		dataSource.User, dataSource.Password, dataSource.Name, dataSource.Host, dataSource.Port)

	database, error := sql.Open("postgres", connection)
	if error != nil {
		panic(error)
	}

	defer database.Close()
	return database
}

func read(filename string) string {
	content, error := ioutil.ReadFile(filename)
	if error != nil {
		panic(error)
	}
	return string(content)
}

func query(database *sql.DB, query string) {
	if _, error := database.Query(query); error != nil {
		panic(error)
	}
	fmt.Println("Query executed successfully")
}

func prepare(args []string) DataSource {
	filename := args[1]

	name := "postgres"
	if len(args) > 2 {
		name = args[3]
	}

	user := "postgres"
	if len(args) > 3 {
		user = args[3]
	}

	password := "postgres"
	if len(args) > 4 {
		password = args[4]
	}

	host := "localhost"
	if len(args) > 5 {
		host = args[5]
	}

	port := "5432"
	if len(args) > 6 {
		port = args[6]
	}

	return DataSource{
		name, user, password, filename, host, port}
}

func main() {
	dataSource := prepare(os.Args)
	database := connect(dataSource)

	query(database, read(dataSource.Filename))
}

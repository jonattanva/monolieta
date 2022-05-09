package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
)

type DataSource struct {
	Name     string
	User     string
	Password string
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
	name := args[1]
	user := args[2]
	password := args[3]

	host := "localhost"
	if len(args) > 4 {
		host = args[4]
	}

	port := "5432"
	if len(args) > 5 {
		port = args[5]
	}

	return DataSource{name, user, password, host, port}
}

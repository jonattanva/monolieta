package main

import (
	"database/sql"
	"flag"
	"fmt"
	"io/ioutil"
)

type DataSource struct {
	Name     string
	Username string
	Password string
	File     string
	Host     string
	Port     string
}

func connect(dataSource DataSource) *sql.DB {
	connection := fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		dataSource.Username, dataSource.Password, dataSource.Name, dataSource.Host, dataSource.Port)

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

func main() {
	file := flag.String("file", "", "Read commands from the file filename.")
	name := flag.String("name", "postgres", "Specifies the name of the database.")
	username := flag.String("username", "postgres", "User name to connect as.")
	password := flag.String("password", "postgres", "Password to connect with.")
	host := flag.String("host", "localhost", "Specifies the host name of the machine on which the server is running.")
	port := flag.String("port", "5432", "Specifies the TCP port on which the server is listening for connections.")

	flag.Parse()
	dataSource := DataSource{
		*name, *username, *password, *file, *host, *port}
	database := connect(dataSource)

	query(database, read(dataSource.File))
}

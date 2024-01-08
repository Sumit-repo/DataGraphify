# DataGraphify: Transforming Raw Data into Visual Insights

DataGraphify is a powerful Java-based software solution that seamlessly converts data from CSV files into compelling visualizations and charts. With an intuitive interface, it efficiently stores data in databases before generating dynamic JSON files. These files serve as the backbone for creating stunning dashboards and visual representations in web technologies. Whether you're a data enthusiast, analyst, or developer, DataGraphify empowers you to craft meaningful insights and unlock the potential within your datasets with ease. Turn raw data into a visual narrative and make informed decisions effortlessly with DataGraphify.

## Screenshots

![Home Page](https://github.com/Sumit-repo/DataGraphify/assets/52080842/988a2b6b-4ddf-4d82-a3a2-1c1805e6987a)
![Demographic Representation](https://github.com/Sumit-repo/DataGraphify/assets/52080842/ac5129cf-39ae-43fa-8ac8-d17c666c8849)
![Graphical Representation](https://github.com/Sumit-repo/DataGraphify/assets/52080842/1aa4256e-fc28-491e-a739-0e9bc3f2d0c1)


## Features

- **CSV to Database:** Efficiently stores data from CSV files into a database for easy retrieval and manipulation.
  
- **JSON Generation:** Generates dynamic JSON files from the stored data, providing a flexible and structured format for web-based visualization.

- **Web Integration:** Seamlessly integrates with web technologies to create interactive charts, dashboards, and visual representations.

## Getting Started

### Prerequisites

- Java Development Kit (JDK) installed
- Database (e.g., MySQL, PostgreSQL) for storing CSV data
- Web development environment for rendering visualizations

### Libraries Used

1. JDBC
2. OpenCSV
3. jackson-databind
4. spring-boot-starter-web

### Installation

1. Clone the repository: `git clone https://github.com/yourusername/DataGraphify.git`
2. Install dependencies using
   `<dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.0.33</version>
        </dependency>`

        `<dependency>
            <groupId>com.opencsv</groupId>
            <artifactId>opencsv</artifactId>
            <version>5.7.1</version>
        </dependency>`

        `<dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.13.0</version>
        </dependency>`

        `<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.2.1</version>
        </dependency> `
4. Navigate to the project directory: `cd DataGraphify`
5. Compile the Java code: `javac FetchingDatasForJSON.java`
6. Run the application: `java FetchingDatasForJSON.java`
7. Then Enjoy the Visulization just by opening `index.html`


## Usage

1. **Data Import:**
   - Place your CSV files in the designated input folder.
   - Run the application to import data into the database.

2. **JSON Generation:**
   - Execute the JSON generation process to create dynamic JSON files.

3. **Web Integration:**
   - Utilize the generated JSON files in your web development environment for creating charts and dashboards.

## Contributing

Contributions are welcome! If you have any ideas, bug fixes, or enhancements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact

For inquiries, please contact Sumit Kumar via 1020sumit@gmail.com.


package blackcoffer;

import java.io.*;
import java.sql.*;
import java.time.*;
import java.time.format.*;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.*;

public class AddingCSVtoDB {

    public static void addCSVtoDatabase(FileReader file, Connection conn)
            throws CsvValidationException, IOException, SQLException {
        try (CSVReader reader = new CSVReader(file)) {

            String raw_data[] = reader.readNext();
            while ((raw_data = reader.readNext()) != null) {
                for (int i = 0; i < raw_data.length; i++) {
                    try {
                        Integer.parseInt(raw_data[i]);
                    } catch (NumberFormatException e) {
                        if (raw_data[i].length() == 0) {
                            raw_data[i] = "null";
                        } else if (isValidDateTimeFormat(raw_data[i])) {
                            raw_data[i] = "\"" + LocalDateTime
                                    .parse(raw_data[i], DateTimeFormatter.ofPattern("MMMM, dd yyyy HH:mm:ss"))
                                    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\"";
                        } else
                            raw_data[i] = "'" + raw_data[i].replace("'", "''") + "'";
                    }
                }
                String query = "insert into Data values (" + String.join(", ", raw_data) + ");";
                conn.createStatement().execute(query);
                // System.out.println(query);
                // break;
            }
        }
    }

    private static boolean isValidDateTimeFormat(String inputString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM, dd yyyy HH:mm:ss");

        try {
            LocalDateTime.parse(inputString, formatter);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }

    public static void main(String[] args) {
        FileReader file;
        try {
            file = new FileReader("assignment\\src\\main\\resources\\Data.csv");

            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                System.out.println("Registered....");
                try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/blackcoffer", "root",
                        "root")) {
                    System.out.println("Database Connected....");
                    addCSVtoDatabase(file, conn);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (FileNotFoundException e) {
            System.err.println("File not found.");
        }
    }
}
package blackcoffer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.*;

@RestController
public class update {

    @GetMapping("/executeJavaCode")
    public String executeJavaCode() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/blackcoffer", "root",
                    "root")) {
                blackcoffer.FetchingDatasForJSON.updateAllData();
                return "Java code executed successfully";
            } catch (SQLException e) {
                return "Connection failed...";
            }
        } catch (ClassNotFoundException e) {
            return "Class not found: " + e.getMessage();
        }
    }
}

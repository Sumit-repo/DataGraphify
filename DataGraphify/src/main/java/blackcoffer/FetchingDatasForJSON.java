package blackcoffer;

import java.io.*;
import java.sql.*;
import java.util.*;

import com.fasterxml.jackson.databind.*;

public class FetchingDatasForJSON {

    static void Update_sector(Connection conn) {
        try {
            TreeMap<String, Integer> sector = new TreeMap<String, Integer>();
            Statement st = conn.createStatement();
            ResultSet resultSet = st
                    .executeQuery("SELECT sector,count(*) FROM Data group by sector having sector<>'null';");

            while (resultSet.next()) {
                sector.put(resultSet.getString(1), resultSet.getInt(2));
            }

            Comparator<Object> valueComparator = Comparator.comparingInt(sector::get).reversed();
            TreeMap<String, Integer> sortedMap = new TreeMap<>(valueComparator);
            sortedMap.putAll(sector);

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            objectMapper.writeValue(new File("Dashboard\\Visulization_objects\\sector.json"), sortedMap);
            System.out.println("Sector data updated...");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    static void Update_start_year(Connection conn) {
        try {
            Map<String, Integer> start_year = new TreeMap<>();
            Statement st = conn.createStatement();
            ResultSet resultSet = st
                    .executeQuery(
                            "SELECT start_year,count(*) FROM Data group by start_year having start_year<>'null';");

            while (resultSet.next()) {
                start_year.put(resultSet.getString(1), resultSet.getInt(2));
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            objectMapper.writeValue(new File("Dashboard\\Visulization_objects\\start_year.json"), start_year);
            System.out.println("Start year data updated...");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    static void Update_end_year(Connection conn) {
        try {
            Map<String, Integer> end_year = new TreeMap<>();
            Statement st = conn.createStatement();
            ResultSet resultSet = st
                    .executeQuery("SELECT end_year,count(*) FROM Data group by end_year having end_year<>'null';");

            while (resultSet.next()) {
                end_year.put(resultSet.getString(1), resultSet.getInt(2));
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            objectMapper.writeValue(new File("Dashboard\\Visulization_objects\\end_year.json"), end_year);
            System.out.println("End year data updated...");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    static void update_countries_and_projects(Connection conn) {
        try {
            Map<String, Integer> smap = new TreeMap<>();
            Statement st = conn.createStatement();
            ResultSet resultSet = st
                    .executeQuery(
                            "select country, count(*) from data where country<>'null' group by country order by count(*) desc;");

            while (resultSet.next()) {
                smap.put(resultSet.getString(1), resultSet.getInt(2));
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            objectMapper.writeValue(new File("Dashboard\\Visulization_objects\\country&projects.json"), smap);
            System.out.println("Countries and projects data updated...");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    static void update_pestle(Connection conn) {
        try {
            Map<String, Integer> smap = new TreeMap<>();
            Statement st = conn.createStatement();
            ResultSet resultSet = st
                    .executeQuery(
                            "select pestle,count(*) from data where pestle<>'null' group by pestle;");

            while (resultSet.next()) {
                smap.put(resultSet.getString(1), resultSet.getInt(2));
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            objectMapper.writeValue(new File("Dashboard\\Visulization_objects\\pestle.json"), smap);
            System.out.println("Pestle data updated...");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    static void update_region_and_projects(Connection conn) {
        try {
            Map<String, Integer> smap = new TreeMap<>();
            Statement st = conn.createStatement();
            ResultSet resultSet = st
                    .executeQuery(
                            "select region, count(*) from data where region not in ('null','world') group by region order by count(*) desc");

            while (resultSet.next()) {
                smap.put(resultSet.getString(1), resultSet.getInt(2));
            }

            Comparator<Object> valueComparator = Comparator.comparingInt(smap::get).reversed();
            TreeMap<String, Integer> map = new TreeMap<>(valueComparator);
            map.putAll(smap);

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            objectMapper.writeValue(new File("Dashboard\\Visulization_objects\\regions&projects.json"), map);
            System.out.println("Regions and projects data updated...");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    static void update_heatmap(Connection conn) {
        try {
            ArrayList<Object[]> smap = new ArrayList<>();
            Statement st = conn.createStatement();
            ResultSet resultSet = st
                    .executeQuery(
                            "select distinct(topic),Intensity,Likelihood,Relevance from data where topic<>'null' group by topic,Intensity,Likelihood,Relevance;");

            while (resultSet.next()) {
                smap.add(new Object[] { resultSet.getString(1), resultSet.getInt(2), resultSet.getInt(3),
                        resultSet.getInt(4) });
            }
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            objectMapper.writeValue(new File("Dashboard\\Visulization_objects\\heatmap.json"), smap);
            System.out.println("Heatmap data updated...");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    static void dashboard(Connection conn) {
        try {
            ArrayList<Object[]> smap = new ArrayList<>();
            Statement st = conn.createStatement();
            ResultSet resultSet = st.executeQuery("select * from data;");

            while (resultSet.next()) {
                smap.add(new Object[] { resultSet.getInt(1),
                        resultSet.getDouble(2),
                        resultSet.getDouble(3),
                        resultSet.getInt(4),
                        resultSet.getString(5),
                        resultSet.getString(6),
                        resultSet.getString(7),
                        resultSet.getString(8),
                        resultSet.getString(9),
                        resultSet.getString(10),
                        resultSet.getInt(11),
                        resultSet.getInt(12),
                        resultSet.getDate(13),
                        resultSet.getDate(14),
                        resultSet.getString(15),
                        resultSet.getString(16),
                        resultSet.getInt(17),
                        resultSet.getString(18),
                        resultSet.getString(19),
                        resultSet.getString(20),
                        resultSet.getInt(21) });
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            objectMapper.writeValue(new File("Dashboard\\Visulization_objects\\Data.json"), smap);
            System.out.println("All Data updated...");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    static void updateAllData() throws ClassNotFoundException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/blackcoffer", "root", "root")) {
            Update_sector(conn);
            Update_start_year(conn);
            Update_end_year(conn);
            update_countries_and_projects(conn);
            update_region_and_projects(conn);
            update_pestle(conn);
            update_heatmap(conn);
            dashboard(conn);
        } catch (SQLException e) {
            System.out.println("Connection failed...");
        }
    }

    public static void main(String[] args) throws ClassNotFoundException {
        updateAllData();
    }
}

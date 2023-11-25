DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Language;
DROP TABLE IF EXISTS Teacher;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Schedule;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS ClassSchedule;
DROP TABLE IF EXISTS Inscription;

CREATE TABLE Users (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL, 
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL, 
    email VARCHAR(60) NOT NULL,
    role TINYINT NOT NULL
);

CREATE TABLE Language (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(60) NOT NULL
);

CREATE TABLE Teacher (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    image VARCHAR(255),
    language_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (language_id) REFERENCES Language(id)
);

CREATE TABLE Student (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    additional_notes TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Horario
CREATE TABLE Schedule (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    classroom VARCHAR(50) NOT NULL
);

-- Clase
CREATE TABLE Class (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    teacher_id BIGINT NOT NULL,
    language_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(id),
    FOREIGN KEY (language_id) REFERENCES Language(id)
);

-- Qué horarios tiene una clase.
CREATE TABLE ClassSchedule (
   id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   class_id BIGINT NOT NULL,
   schedule_id BIGINT NOT NULL,
   FOREIGN KEY (class_id) REFERENCES Class(id),
   FOREIGN KEY (schedule_id) REFERENCES Schedule(id)
);

-- Qué alumnos hay en cada clase
CREATE TABLE Inscription (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    class_id BIGINT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student(id),
    FOREIGN KEY (class_id) REFERENCES Class(id)
);

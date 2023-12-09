package asi.rest.controllers;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Student;
import asi.model.entities.Teacher;
import asi.model.entities.Users;
import asi.model.services.StudentService;
import asi.rest.dtos.StudentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<Student> createStudent(@RequestBody StudentDto studentDto) throws DuplicateInstanceException {
        // Conversion from DTO to entity
        Users users = new Users();
        Student newStudent = new Student();
        users.setUserName(studentDto.getFirstName());
        users.setPassword(studentDto.getPassword());
        users.setFirstName(studentDto.getFirstName());
        users.setLastName(studentDto.getLastName());
        users.setEmail(studentDto.getFirstName()+"@unervesalis.com");
        users.setRole(Users.RoleType.STUDENT);

        newStudent.setUser(users);
        newStudent.setAdditionalNotes(studentDto.getAdditionalNotes());

        // Call the service method to save the new student
        return ResponseEntity.ok(studentService.createStudent(newStudent));
    }
}

package asi.rest.controllers;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import asi.model.entities.Teacher;
import asi.model.services.TeacherService;
import asi.model.services.LanguageService;
import asi.rest.dtos.TeacherDto;

import java.io.IOException;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private LanguageService languageService;

    @PostMapping("/create")
    public ResponseEntity<Teacher> createTeacher(@ModelAttribute TeacherDto teacherDto) throws IOException {
        // Sample conversion from DTO to entity
        Users users = new Users();
        Teacher newTeacher = new Teacher();
        users.setUserName(teacherDto.getFirstName());
        users.setPassword(teacherDto.getPassword());
        users.setFirstName(teacherDto.getFirstName());
        users.setLastName(teacherDto.getLastName());
        users.setEmail(teacherDto.getFirstName()+"@unervesalis.com");
        users.setRole(Users.RoleType.TEACHER);
        newTeacher.setUser(users);
        newTeacher.setImage(teacherDto.getImage().getBytes());
        newTeacher.setLanguage(languageService.findLanguageById(teacherDto.getLanguageId()).get());

        // Call the service method to save the new teacher
        Teacher savedTeacher = null;
        try {
            savedTeacher = teacherService.createTeacher(newTeacher);
        } catch (DuplicateInstanceException e) {
            e.printStackTrace();
        }

        // Return the created teacher in the response
        return ResponseEntity.ok(savedTeacher);
    }
}

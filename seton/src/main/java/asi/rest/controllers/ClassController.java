package asi.rest.controllers;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.ClassEntity;
import asi.model.services.ClassService;
import asi.model.services.LanguageService;
import asi.model.services.TeacherService;
import asi.rest.dtos.ClassDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/classes")

public class ClassController {

    @Autowired
    private ClassService classService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private LanguageService languageService;

    @GetMapping
    public ResponseEntity<List<ClassEntity>> getAllClasses() {
        List<ClassEntity> classEntities = classService.findAllClassEntities();
        return ResponseEntity.ok(classEntities);
    }

    @PostMapping("/create")
    public ResponseEntity<ClassEntity> createClass(@ModelAttribute ClassDto classDto) throws DuplicateInstanceException {
        ClassEntity newClassEntity = new ClassEntity();
        newClassEntity.setGroupName(classDto.getGroupName());
        newClassEntity.setLevel(classDto.getLevel());
        newClassEntity.setTeacher(teacherService.findTeacherById(classDto.getTeacherId()).get());
        newClassEntity.setLanguage(languageService.findLanguageById(classDto.getLanguageId()).get());

        // Call the service method to save the new class
        ClassEntity savedClassEntity = null;
        try {
            savedClassEntity = classService.createClass(newClassEntity);
        } catch (DuplicateInstanceException e) {
            e.printStackTrace();
        }

        //Return the created class in the response
        return ResponseEntity.ok(savedClassEntity);
    }

}

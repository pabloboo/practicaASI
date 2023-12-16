package asi.rest.controllers;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Class;
import asi.model.services.ClassService;
import asi.model.services.LanguageService;
import asi.model.services.TeacherService;
import asi.rest.dtos.ClassDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/classes")

public class ClassController {

    @Autowired
    private ClassService classService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private LanguageService languageService;

    @PostMapping("/create")
    public ResponseEntity<Class> createClass(@ModelAttribute ClassDto classDto) throws DuplicateInstanceException {
        Class newClass = new Class();
        newClass.setGroupName(classDto.getGroupName());
        newClass.setLevel(classDto.getLevel());
        newClass.setTeacher(teacherService.findTeacherById(classDto.getTeacherId()).get());
        newClass.setLanguage(languageService.findLanguageById(classDto.getLanguageId()).get());

        // Call the service method to save the new class
        Class savedClass = null;
        try {
            savedClass = classService.createClass(newClass);
        } catch (DuplicateInstanceException e) {
            e.printStackTrace();
        }

        //Return the created class in the response
        return ResponseEntity.ok(savedClass);
    }

}

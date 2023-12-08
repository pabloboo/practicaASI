package asi.rest.controllers;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Class;
import asi.model.services.ClassService;
import asi.rest.dtos.ClassDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/Classes/")

public class ClassController {

    @Autowired
    private ClassService classService;

    @PostMapping("/create")
    public ResponseEntity<Class> createClass(@RequestBody ClassDto classDto) throws DuplicateInstanceException {
        Class newClass = new Class();
        newClass.setId(classDto.getId());
        newClass.setGroupName(classDto.getGroupName());
        newClass.setLevel(classDto.getLevel());
        newClass.setTeacherId(classDto.getTeacherId());
        newClass.setLanguage(classDto.getLanguage());
        newClass.setTeacher(classDto.getTeacher());
        return ResponseEntity.ok(classService.createClass(newClass));
    }

}

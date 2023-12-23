package asi.rest.controllers;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.ClassSchedule;
import asi.model.services.ClassScheduleService;
import asi.model.services.ClassService;
import asi.model.services.ScheduleService;
import asi.rest.dtos.ClassScheduleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/classSchedules")
public class ClassScheduleController {

    @Autowired
    private ClassScheduleService classScheduleService;

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private ClassService classService;

    @GetMapping
    public ResponseEntity<List<ClassSchedule>> getAllClassSchedules() {
        List<ClassSchedule> classSchedules = classScheduleService.findAllClassSchedules();
        return ResponseEntity.ok(classSchedules);
    }

    @PostMapping("/create")
    public ResponseEntity<ClassSchedule> createClassSchedule(@ModelAttribute ClassScheduleDto classScheduleDto) {
        ClassSchedule newClassSchedule = new ClassSchedule();
        newClassSchedule.setSchedule(scheduleService.findScheduleById(classScheduleDto.getScheduleId()).get());
        newClassSchedule.setClassEntity(classService.findClassById(classScheduleDto.getClassId()).get());

        //Call the service method to save the new ClassSchedule
        ClassSchedule savedClassSchedule = null;
        try {
            savedClassSchedule = classScheduleService.createClassSchedule(newClassSchedule);
        } catch (DuplicateInstanceException e) {
            e.printStackTrace();
        }

        // Return the created class schedule in the response
        return ResponseEntity.ok(savedClassSchedule);
    }

    @GetMapping("/getClassSchedulesByClassId/{classId}")
    public ResponseEntity<List<ClassSchedule>> getClassSchedulesByClassId(@PathVariable Long classId) {
        // Usa classId para recuperar los horarios de esa clase
        List<ClassSchedule> classSchedules = classScheduleService.findClassSchedulesByClassId(classId);

        // Devuelve los horarios de la clase en la respuesta
        return ResponseEntity.ok(classSchedules);
    }


}

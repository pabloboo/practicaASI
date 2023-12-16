package asi.rest.controllers;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Inscription;
import asi.model.services.ClassService;
import asi.model.services.InscriptionService;
import asi.model.services.StudentService;
import asi.rest.dtos.InscriptionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inscriptions")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    @Autowired
    private ClassService classService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<Inscription> createInscription(@ModelAttribute InscriptionDto inscriptionDto) {
        Inscription inscription = new Inscription();
        inscription.setaClassEntity(classService.findClassById(inscriptionDto.getaClassId()).get());
        inscription.setStudent(studentService.findStudentById(inscriptionDto.getStudentId()).get());

        //Call the service to save the new inscription
        Inscription savedInscription = null;
        try {
            savedInscription = inscriptionService.createInscription(inscription);
        } catch (DuplicateInstanceException e) {
            e.printStackTrace();
        }

        // Return the created inscription in the response
        return ResponseEntity.ok(savedInscription);
    }

}

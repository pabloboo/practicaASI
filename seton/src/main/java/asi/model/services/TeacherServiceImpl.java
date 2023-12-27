package asi.model.services;

import asi.model.common.exceptions.CannotCreateTeacherException;
import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {



    @Autowired
    private InscriptionDao inscriptionDao;

    @Autowired
    private ClassDao classDao ;


    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private LanguageService languageService;

    @Autowired
    private UserService userService;

    @Override
    public List<Teacher> findAllTeachers() {
        return teacherDao.findAll();
    }

    @Override
    public Optional<Teacher> findTeacherById(Long id) {
        return teacherDao.findById(id);
    }

    @Override
    public Optional<Teacher> findTeacherByUserId(Long userId) {
        return teacherDao.findByUserId(userId);
    }

    @Override
    public Teacher createTeacher(Teacher teacher) throws DuplicateInstanceException, CannotCreateTeacherException {
        if (userService.existsByUsername(teacher.getUser().getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", teacher.getUser().getUserName());
        }

        if(languageService.findLanguageById(teacher.getLanguage().getId()).isPresent()){
            Language language = languageService.findLanguageById(teacher.getLanguage().getId()).get();
            teacher.setLanguage(language);
            userService.signUp(teacher.getUser());
            return teacherDao.save(teacher);
        } else throw new
                CannotCreateTeacherException("No se puede crear el profesor: " + teacher.getUser().getUserName());

    }

    @Override
    public List<Inscription> getInscriptionsByTeacher(Long teacherId) {

        List<ClassEntity> classEntities = classDao.findAllByTeacherId(teacherId);
        List<Inscription> inscriptions = new ArrayList<>();

        if(!classEntities.isEmpty()){
            classEntities.forEach(classEntity -> {
                 inscriptions.addAll(inscriptionDao.findByaClassEntityId(classEntity.getId()));
            });
        }

        return inscriptions;

    }
}
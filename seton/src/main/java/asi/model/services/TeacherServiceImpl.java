package asi.model.services;

import asi.model.entities.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Language;
import asi.model.entities.Teacher;
import asi.model.entities.TeacherDao;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {

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
    public Teacher createTeacher(Teacher teacher) throws DuplicateInstanceException {
        if (userService.existsByUsername(teacher.getUser().getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", teacher.getUser().getUserName());
        }

        Language language = languageService.findLanguageById(teacher.getLanguage().getId()).get();

        if (language == null) {
            throw new RuntimeException();
        }

        teacher.setLanguage(language);
        userService.signUp(teacher.getUser());
        return teacherDao.save(teacher);
    }
}
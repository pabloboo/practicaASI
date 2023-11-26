package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Student;
import asi.model.entities.StudentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private UserService userService;

    @Override
    public Student createStudent(Student student) throws DuplicateInstanceException {

        if (userService.existsByUsername(student.getUser().getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", student.getUser().getUserName());
        }

        userService.signUp(student.getUser());
        return studentDao.save(student);
    }
}

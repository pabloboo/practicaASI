package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Student;
import asi.model.entities.StudentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private UserService userService;

    @Override
    public Optional<Student> findStudentById(Long id) {
        return studentDao.findById(id);
    }

    @Override
    public List<Student> findAllStudents() {
        return studentDao.findAll();
    }

    @Override
    public Student createStudent(Student student) throws DuplicateInstanceException {

        if (userService.existsByUsername(student.getUser().getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", student.getUser().getUserName());
        }

        userService.signUp(student.getUser());
        return studentDao.save(student);
    }
}

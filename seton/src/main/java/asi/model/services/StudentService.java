package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {

    Optional<Student> findStudentById(Long id);

    List<Student> findAllStudents();

    Student createStudent(Student student) throws DuplicateInstanceException;
}

package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Student;

public interface StudentService {
    Student createStudent(Student student) throws DuplicateInstanceException;
}

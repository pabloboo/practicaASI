package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Teacher;

import java.util.List;
import java.util.Optional;

public interface TeacherService {

    public List<Teacher> findAllTeachers();

    public Optional<Teacher> findTeacherById(Long id);

    Teacher createTeacher(Teacher teacher) throws DuplicateInstanceException;
}
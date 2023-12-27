package asi.model.services;

import asi.model.common.exceptions.CannotCreateTeacherException;
import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.ClassEntity;
import asi.model.entities.Inscription;
import asi.model.entities.Student;
import asi.model.entities.Teacher;

import java.util.List;
import java.util.Optional;

public interface TeacherService {

    List<Teacher> findAllTeachers();

    Optional<Teacher> findTeacherById(Long id);

    Optional<Teacher> findTeacherByUserId(Long userId);

    Teacher createTeacher(Teacher teacher) throws DuplicateInstanceException, CannotCreateTeacherException;

    List<Inscription> getInscriptionsByTeacher(Long teacherId);

}
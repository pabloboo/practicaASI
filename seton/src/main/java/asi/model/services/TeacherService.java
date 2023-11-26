package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Teacher;

public interface TeacherService {
    Teacher createTeacher(Teacher teacher) throws DuplicateInstanceException;
}
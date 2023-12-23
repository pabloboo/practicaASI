package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.ClassSchedule;

import java.util.List;
import java.util.Optional;

public interface ClassScheduleService {

    public List<ClassSchedule> findAllClassSchedules();

    public Optional<ClassSchedule> findClassScheduleById(Long id);

    public List<ClassSchedule> findClassSchedulesByClassId(Long classId);

    ClassSchedule createClassSchedule(ClassSchedule classSchedule) throws DuplicateInstanceException;

}

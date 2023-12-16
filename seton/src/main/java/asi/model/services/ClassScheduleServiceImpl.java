package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.ClassDao;
import asi.model.entities.ClassEntity;
import asi.model.entities.ClassSchedule;
import asi.model.entities.ClassScheduleDao;
import asi.model.entities.Schedule;
import asi.model.entities.ScheduleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClassScheduleServiceImpl implements ClassScheduleService {

    @Autowired
    private ClassScheduleDao classScheduleDao;

    @Autowired
    private ScheduleDao scheduleDao;

    @Autowired
    private ClassDao classDao;

    @Override
    public List<ClassSchedule> findAllClassSchedules() {
        return classScheduleDao.findAll();
    }

    @Override
    public Optional<ClassSchedule> findClassScheduleById(Long id) {
        return classScheduleDao.findById(id);
    }

    @Override
    public ClassSchedule createClassSchedule(ClassSchedule classSchedule) throws DuplicateInstanceException {
        List<ClassSchedule> classScheduleList = classScheduleDao.findAll();
        for (ClassSchedule classScheduleIterator: classScheduleList) {
            if (classScheduleIterator.getClassEntity().equals(classSchedule.getClassEntity()) &&
                classScheduleIterator.getSchedule().equals(classSchedule.getSchedule())) {
                throw new DuplicateInstanceException("project.entities.classSchedule", classSchedule.getClassEntity().getGroupName());
            }
        }

        Schedule schedule = scheduleDao.findById(classSchedule.getSchedule().getId()).get();
        ClassEntity classEntity = classDao.findById(classSchedule.getClassEntity().getId()).get();
        return classScheduleDao.save(classSchedule);
    }
}

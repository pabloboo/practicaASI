package asi.model.services;

import asi.model.entities.Schedule;
import asi.model.entities.ScheduleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleDao scheduleDao;

    @Override
    public List<Schedule> findAllSchedules() {
        return scheduleDao.findAll();
    }

    @Override
    public Optional<Schedule> findScheduleById(Long id) {
        return scheduleDao.findById(id);
    }

    @Override
    public Schedule createSchedule(Schedule schedule) {
        return scheduleDao.save(schedule);
    }
}

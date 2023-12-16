package asi.model.services;

import asi.model.entities.Schedule;

import java.util.List;
import java.util.Optional;

public interface ScheduleService {

    public List<Schedule> findAllSchedules();

    public Optional<Schedule> findScheduleById(Long id);

    Schedule createSchedule(Schedule schedule);

}

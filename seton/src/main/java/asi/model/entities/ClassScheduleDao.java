package asi.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassScheduleDao extends JpaRepository<ClassSchedule, Long> {

    List<ClassSchedule> findClassScheduleByClassEntityId(Long classEntityId);

}
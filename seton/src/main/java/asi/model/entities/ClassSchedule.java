package asi.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ClassSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long classId;
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassEntity aClassEntity;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    public ClassSchedule() {
        // Default constructor
    }

    public ClassSchedule(Long classId, Long scheduleId, ClassEntity aClassEntity, Schedule schedule) {
        this.classId = classId;
        this.scheduleId = scheduleId;
        this.aClassEntity = aClassEntity;
        this.schedule = schedule;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public ClassEntity getaClass() {
        return aClassEntity;
    }

    public void setaClass(ClassEntity aClassEntity) {
        this.aClassEntity = aClassEntity;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }
}
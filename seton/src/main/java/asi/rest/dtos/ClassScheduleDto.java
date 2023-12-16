package asi.rest.dtos;

public class ClassScheduleDto {

    private Long classId;
    private Long scheduleId;

    public ClassScheduleDto() {
        super();
    }

    public ClassScheduleDto(Long classId, Long scheduleId) {
        this.classId = classId;
        this.scheduleId = scheduleId;
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
}

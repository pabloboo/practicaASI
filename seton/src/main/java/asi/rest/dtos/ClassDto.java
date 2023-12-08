package asi.rest.dtos;

import asi.model.entities.Language;
import asi.model.entities.Teacher;

public class ClassDto {
    private Long id;
    private String groupName;
    private String level;
    private Long teacherId;
    private Language language;
    private Teacher teacher;
    public ClassDto() {
        super();
    }
    public ClassDto(Long id, String groupName, String level, Long teacherId, Language language, Teacher teacher) {
        this.id = id;
        this.groupName = groupName;
        this.level = level;
        this.teacherId = teacherId;
        this.language = language;
        this.teacher = teacher;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getGroupName() {
        return groupName;
    }
    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
    public String getLevel() {
        return level;
    }
    public void setLevel(String level) {
        this.level = level;
    }
    public Long getTeacherId() {
        return teacherId;
    }
    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }
    public Language getLanguage() {
        return language;
    }
    public void setLanguage(Language language) {
        this.language = language;
    }
    public Teacher getTeacher() {
        return teacher;
    }
    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
}

package asi.rest.dtos;

import asi.model.entities.Language;
import asi.model.entities.Teacher;

public class ClassDto {

    private String groupName;
    private String level;
    private Long teacherId;
    private Long languageId;

    public ClassDto() {
        super();
    }

    public ClassDto(String groupName, String level, Long teacherId, Long languageId) {
        this.groupName = groupName;
        this.level = level;
        this.teacherId = teacherId;
        this.languageId = languageId;
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

    public Long getLanguageId() {
        return languageId;
    }

    public void setLanguageId(Long languageId) {
        this.languageId = languageId;
    }
}

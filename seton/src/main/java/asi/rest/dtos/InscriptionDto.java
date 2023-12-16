package asi.rest.dtos;

public class InscriptionDto {

    private Long aClassId;
    private Long studentId;

    public InscriptionDto() { super(); }

    public InscriptionDto(Long aClassId, Long studentId) {
        this.aClassId = aClassId;
        this.studentId = studentId;
    }

    public Long getaClassId() {
        return aClassId;
    }

    public void setaClassId(Long aClassId) {
        this.aClassId = aClassId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
}

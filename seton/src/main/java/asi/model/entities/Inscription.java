package asi.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassEntity aClassEntity;

    public Inscription() {
        // Default constructor
    }

    public Inscription(Long id, Student student, ClassEntity aClassEntity) {
        this.id = id;
        this.student = student;
        this.aClassEntity = aClassEntity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public ClassEntity getaClassEntity() {
        return aClassEntity;
    }

    public void setaClassEntity(ClassEntity aClassEntity) {
        this.aClassEntity = aClassEntity;
    }
}
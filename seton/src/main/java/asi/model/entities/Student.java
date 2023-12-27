package asi.model.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "additional_notes")
    private String additionalNotes;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @OneToMany
    private List<Inscription> inscription;


    public Student() {
        // Default constructor
    }

    public Student(Users user, String additionalNotes) {
        this.user = user;
        this.additionalNotes = additionalNotes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }
}
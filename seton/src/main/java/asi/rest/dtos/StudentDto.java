package asi.rest.dtos;

import org.springframework.web.multipart.MultipartFile;

public class StudentDto {

    private String firstName;
    private String lastName;
    private String password;
    private String additionalNotes;

    public StudentDto() {
        super();
    }

    public StudentDto(String firstName, String lastName, String password, String additionalNotes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.additionalNotes = additionalNotes;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }
}

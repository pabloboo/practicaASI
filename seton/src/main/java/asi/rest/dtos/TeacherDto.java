package asi.rest.dtos;

import org.springframework.web.multipart.MultipartFile;

public class TeacherDto {

    private String userName;
    private String firstName;
    private String lastName;
    private String password;
    private MultipartFile image;
    private Long languageId;

    public TeacherDto() {
        super();
    }

    public TeacherDto(String userName, String firstName, String lastName, String password, MultipartFile image, Long languageId) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.image = image;
        this.languageId = languageId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public Long getLanguageId() {
        return languageId;
    }

    public void setLanguageId(Long languageId) {
        this.languageId = languageId;
    }
}
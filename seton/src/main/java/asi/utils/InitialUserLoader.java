package asi.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import asi.model.entities.Users;
import asi.model.services.UserService;

@Component
public class InitialUserLoader implements CommandLineRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public InitialUserLoader(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the admin user already exists
        if (!userService.existsByUsername("admin")) {
            // Create an initial admin user if it doesn't exist
            Users admin = new Users();
            admin.setUserName("admin");
            //admin.setPassword(passwordEncoder.encode("admin")); // Encode password
            admin.setPassword("admin"); // Encode password
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@example.com");
            admin.setRole(Users.RoleType.ADMIN); // Set role as needed

            userService.signUp(admin); // Persist the admin user
        }
    }
}

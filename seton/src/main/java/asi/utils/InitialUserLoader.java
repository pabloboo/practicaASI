package asi.utils;

import asi.model.entities.Language;
import asi.model.services.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import asi.model.entities.Users;
import asi.model.services.UserService;

@Component
public class InitialUserLoader implements CommandLineRunner {

    private final UserService userService;
    private final LanguageService languageService;

    @Autowired
    public InitialUserLoader(UserService userService, LanguageService languageService) {
        this.userService = userService;
        this.languageService = languageService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the admin user already exists
        if (!userService.existsByUsername("admin")) {
            // Create an initial admin user if it doesn't exist
            Users admin = new Users();
            admin.setUserName("admin");
            admin.setPassword("admin");
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@example.com");
            admin.setRole(Users.RoleType.ADMIN);

            userService.signUp(admin); // Persist the admin user
        }

        // Check if the English language already exists
        if (!languageService.existsByName("Inglés")) {
            // Create an initial language if it doesn't exist
            Language language = new Language();
            language.setName("Inglés");
            language.setDescription("Idioma inglés");

            languageService.createLanguage(language); // Persist the language
        }

        // Check if the German language already exists
        if (!languageService.existsByName("Alemán")) {
            // Create an initial language if it doesn't exist
            Language language = new Language();
            language.setName("Alemán");
            language.setDescription("Idioma alemán");

            languageService.createLanguage(language); // Persist the language
        }

        // Check if the French language already exists
        if (!languageService.existsByName("Francés")) {
            // Create an initial language if it doesn't exist
            Language language = new Language();
            language.setName("Francés");
            language.setDescription("Idioma francés");

            languageService.createLanguage(language); // Persist the language
        }

        // Check if the Chineese language already exists
        if (!languageService.existsByName("Chino mandarín")) {
            // Create an initial language if it doesn't exist
            Language language = new Language();
            language.setName("Chino mandarín");
            language.setDescription("Idioma chino mandarín");

            languageService.createLanguage(language); // Persist the language
        }

    }
}

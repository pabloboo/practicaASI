package asi.model.entities;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The Interface LanguageDao.
 */
public interface LanguageDao extends JpaRepository<Language, Long> {

    /**
     * Checks if a language with the given username already exists.
     *
     * @param name the name to check
     * @return true if the language with the given name exists, false otherwise
     */
    boolean existsByName(String name);

    /**
     * Finds a language by name.
     *
     * @param name the name of the language to find
     * @return an Optional containing the language with the given username, or empty if not found
     */
    Optional<Language> findByName(String name);

}
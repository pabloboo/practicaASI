package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Language;

import java.util.List;
import java.util.Optional;

public interface LanguageService {

    public List<Language> findAllLanguages();

    public Optional<Language> findLanguageById(Long id);

    public Boolean existsByName(String name);

    public Language createLanguage(Language language) throws DuplicateInstanceException;
}

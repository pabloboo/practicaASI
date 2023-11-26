package asi.model.services;

import asi.model.entities.LanguageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Language;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LanguageServiceImpl implements LanguageService {

    @Autowired
    private LanguageDao languageDao;

    @Override
    public List<Language> findAllLanguages() {
        return languageDao.findAll();
    }

    @Override
    public Optional<Language> findLanguageById(Long id) {
        return languageDao.findById(id);
    }

    @Override
    public Boolean existsByName(String name) {
        return languageDao.existsByName(name);
    }

    @Override
    public Language createLanguage(Language language) throws DuplicateInstanceException {
        if (languageDao.existsByName(language.getName())) {
            throw new DuplicateInstanceException("project.entities.language", language.getName());
        }

        return languageDao.save(language);
    }
}
package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.ClassEntity;

import java.util.List;
import java.util.Optional;

public interface ClassService {

    Optional<ClassEntity> findClassById(Long id);

    List<ClassEntity> findAllClassEntities();

    ClassEntity createClass(ClassEntity newClassEntity) throws DuplicateInstanceException;
}

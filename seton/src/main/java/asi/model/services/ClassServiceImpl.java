package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.ClassEntity;
import asi.model.entities.ClassDao;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClassServiceImpl implements ClassService{
    @Autowired
    private ClassDao classDao;

    @Override
    public Optional<ClassEntity> findClassById(Long id) {
        return classDao.findById(id);
    }

    @Override
    public List<ClassEntity> findAllClassEntities() {
        return classDao.findAll();
    }

    @Override
    public ClassEntity createClass(ClassEntity newClassEntity) throws DuplicateInstanceException {
        if (classDao.existsByGroupName(newClassEntity.getGroupName())) {
            throw new DuplicateInstanceException("project.entities.class", newClassEntity.getGroupName());
        }
        return classDao.save(newClassEntity);
    }
}

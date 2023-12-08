package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Class;
import asi.model.entities.ClassDao;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ClassServiceImpl implements ClassService{
    @Autowired
    private ClassDao classDao;

    @Override
    public Class createClass(Class newClass) throws DuplicateInstanceException {
        if (classDao.existsById(newClass.getId())) {
            throw new DuplicateInstanceException("project.entities.class", newClass.getGroupName());
        }
        return classDao.save(newClass);
    }
}

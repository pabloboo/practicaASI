package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.ClassEntity;
import asi.model.entities.ClassDao;
import asi.model.entities.Inscription;
import asi.model.entities.InscriptionDao;
import asi.model.entities.Student;
import asi.model.entities.StudentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InscriptionServiceImpl implements InscriptionService {

    @Autowired
    private InscriptionDao inscriptionDao;

    @Autowired
    private ClassDao classDao;

    @Autowired
    private StudentDao studentDao;

    @Override
    public Inscription createInscription(Inscription inscription) throws DuplicateInstanceException {
        List<Inscription> inscriptionList = inscriptionDao.findAll();
        for (Inscription inscriptionIterator : inscriptionList) {
            if (inscriptionIterator.getaClassEntity().equals(inscription.getaClassEntity()) &&
                inscriptionIterator.getStudent().equals(inscription.getStudent())) {
                throw new DuplicateInstanceException("project.entities.inscription", inscription.getaClassEntity().getGroupName());
            }
        }

        ClassEntity aClassEntity = classDao.findById(inscription.getaClassEntity().getId()).get();
        Student student = studentDao.findById(inscription.getStudent().getId()).get();

        if (aClassEntity == null || student == null) {
            throw new RuntimeException();
        }

        inscription.setaClassEntity(aClassEntity);
        inscription.setStudent(student);
        return inscriptionDao.save(inscription);
    }
}

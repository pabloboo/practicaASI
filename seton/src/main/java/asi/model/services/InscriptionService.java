package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Inscription;

import java.util.List;

public interface InscriptionService {

    Inscription createInscription(Inscription inscription) throws DuplicateInstanceException;

    List<Inscription> findInscriptionsByStudentId(Long studentId);

}

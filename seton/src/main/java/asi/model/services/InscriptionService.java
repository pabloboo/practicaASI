package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Inscription;

public interface InscriptionService {

    Inscription createInscription(Inscription inscription) throws DuplicateInstanceException;

}

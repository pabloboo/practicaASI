package asi.model.services;

import asi.model.common.exceptions.DuplicateInstanceException;
import asi.model.entities.Class;

public interface ClassService {

    Class createClass(Class newClass) throws DuplicateInstanceException;
}

package asi.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassDao extends JpaRepository<Class, Long> {

    /**
     * Exists by user name.
     *
     * @param userName the user name
     * @return true, if successful
     */
    boolean existsByGroupName(String groupName);

}

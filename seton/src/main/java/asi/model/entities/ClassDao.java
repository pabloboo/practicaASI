package asi.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassDao extends JpaRepository<ClassEntity, Long> {

    /**
     * Exists by group name.
     *
     * @param groupName the group name
     * @return true, if successful
     */
    boolean existsByGroupName(String groupName);

}

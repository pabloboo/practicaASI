package asi.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * The Interface TeacherDao.
 */
public interface TeacherDao extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByUserId(Long userId);

}
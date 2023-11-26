package asi.model.entities;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The Interface TeacherDao.
 */
public interface TeacherDao extends JpaRepository<Teacher, Long> {
}
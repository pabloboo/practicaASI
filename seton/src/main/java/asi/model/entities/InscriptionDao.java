package asi.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscriptionDao extends JpaRepository<Inscription, Long> {

    /**
     * Verifica si existe una inscripción dado un Student y un ClassEntity.
     *
     * @param student       El objeto Student
     * @param aClassEntity  El objeto ClassEntity
     * @return true si existe una inscripción con esos objetos, false en caso contrario
     */
    // boolean existsByStudentAndAClassEntity(Student student, ClassEntity aClassEntity);

    List<Inscription> findAllByStudentId(Long studentId);

}

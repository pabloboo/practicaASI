package asi.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscriptionDao extends JpaRepository<Inscription, Long> {


    // boolean existsByStudentAndAClassEntity(Student student, ClassEntity aClassEntity);

    List<Inscription> findAllByStudentId(Long studentId);

    List<Inscription> findByaClassEntityId(Long id);







}

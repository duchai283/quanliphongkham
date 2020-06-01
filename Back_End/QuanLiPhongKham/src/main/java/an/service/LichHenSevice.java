package an.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import an.model.LichHen;
import an.respository.LichHenRepository;


@Service
public class LichHenSevice {
	 @PersistenceUnit
	 private EntityManagerFactory emf;
	
	@Autowired
	LichHenRepository lichHenRepository;
	
	public Iterable<LichHen> findAll() {
		return lichHenRepository.findAll();
	}
	
//	@Query("SELECT u FROM User u WHERE u.status = 1")
//    List<LichHen> findAllActiveUsers();
	
	
	public LichHen  save(LichHen lichhen) {
		return lichHenRepository.save(lichhen);
	}

}

package an.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import an.model.BenhNhan;
import an.respository.BenhNhanRepository;

@Service
public class BenhNhanService {

	@Autowired
	BenhNhanRepository benhNhanRepository;

	public Iterable<BenhNhan> findAll() {
		return benhNhanRepository.findAll();
	}

	public BenhNhan  save(BenhNhan benhnhan) {
		return benhNhanRepository.save(benhnhan);
	}
	
	
	
}

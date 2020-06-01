package an.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import an.model.Thuoc;
import an.respository.ThuocRepository;

@Service
public class ThuocService {
	
	@Autowired
	ThuocRepository thuocRepository;

	public Iterable<Thuoc> findAll() {
		return thuocRepository.findAll();
	}
	
	public Thuoc save(Thuoc thuoc) {
		return thuocRepository.save(thuoc);
	}
}

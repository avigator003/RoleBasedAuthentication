package in.avigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.avigator.Model.SystemUser;

public interface UserRepository extends JpaRepository<SystemUser,String> {
       
	public SystemUser findByUserName(String username);
}   

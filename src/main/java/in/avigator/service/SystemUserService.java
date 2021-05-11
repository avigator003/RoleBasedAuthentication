
package in.avigator.service;

import java.util.List;

import javax.persistence.EntityManagerFactory;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.avigator.Model.SystemUser;
import in.avigator.Repository.UserRepository;
import in.avigator.principal.SystemUserDetails;


@Service
public class SystemUserService implements UserDetailsService
{

	@Autowired
	UserRepository userRepo;

	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private EntityManagerFactory entityManagerFactory;

	public Session giveSession() {
		SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
		Session ss = sessionFactory.openSession();
		return ss;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		SystemUser user = userRepo.findByUserName(username);
		
		if (user == null) {
			throw new UsernameNotFoundException("Could not find user");
		} else {
			return new SystemUserDetails(user);

		}
	}
	
	
	public boolean save(SystemUser user) 
	{
	     user.setIsActive(true);
         userRepo.save(user);
		 return true;
	}
	
	public boolean update(SystemUser user,String filename)
    {		
		SystemUser ob = userRepo.getOne(user.getUserId());
	           ob.update(user);
			   userRepo.save(ob);
		        return true;
	}

	
     public List<SystemUser> getUsers()
	   {		
		Session ss=giveSession();
		Query query=ss.createQuery("from SystemUser");
		List<SystemUser> userList=query.list();
		ss.close();
		return userList;
	}
	
	
	public void changeStatus(String userId, boolean status) 
	{

		SystemUser user = userRepo.getOne(userId);
		user.setIsActive(status);
		userRepo.save(user);
	}

	
     public SystemUser get(String userId) {
		return userRepo.getOne(userId);
	}

     
     public String getId(String userName)
     {
         Session ss=giveSession();
    	 Query query = ss.createQuery("from SystemUser where userName=:userName");
  		 query.setParameter("userName", userName) ;
  		 SystemUser user=  (SystemUser)query.uniqueResult();
  		 ss.close();
    	return user.getUserId();
     }
     
	public String getUserName(String userid)
	{
		return userRepo.getOne(userid).getUserName();		
	}
}

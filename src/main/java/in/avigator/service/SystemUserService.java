
package in.avigator.service;

import java.util.List;

import javax.persistence.EntityManagerFactory;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.avigator.Model.SystemUser;
import in.avigator.Repository.UserRepository;

@Service
public class SystemUserService
{

	@Autowired
	UserRepository userRepo;

	
	@Autowired
	private EntityManagerFactory entityManagerFactory;

	public Session giveSession() {
		SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
		Session ss = sessionFactory.openSession();
		return ss;
	}
	

     public SystemUser login(String username,String password)
	   {		
		Session ss=giveSession();
		Query query=ss.createQuery("from SystemUser where userName=:username and password=:password");
		query.setString("username", username);
		query.setString("password", password);
		SystemUser user=(SystemUser)query.uniqueResult();
		ss.close();
		return user;
	   }
	
	
	
	
	public boolean save(SystemUser user) 
	{
	     user.setIsActive(true);
         userRepo.save(user);
		 return true;
	}
	
            public boolean update(SystemUser user,String userId)
     {		
		       SystemUser ob = userRepo.findById(userId).get();
		       ob.update(user);
		       ob.setMobile(user.getMobile());
			   userRepo.save(ob);
		       return true;
	}
            

            public boolean delete(String userId)
     {		
			   userRepo.deleteById(userId);
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
    	System.out.println("status"+status);
    	
		user.setIsActive(status);
		System.out.println("status"+user);
		
		userRepo.save(user);
	}


     
	public SystemUser getUserById(String userid)
	{
		return userRepo.findById(userid).get();	
	}
}

package in.avigator.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.avigator.Model.SystemUser;
import in.avigator.service.SystemUserService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api")
public class WebController {

	@Autowired
    SystemUserService userService;
	
	@RequestMapping("/login")
	public void login() {
		
         
	}
	
	@RequestMapping("/getusers")
	public List<SystemUser> getUsers() {
		  System.out.println("getting");
			 
		  return userService.getUsers();
    }
	
	@RequestMapping("/create")
	public boolean createUser(  @RequestBody SystemUser user) {
		   return userService.save(user);
   }
	
	@RequestMapping("/update/{id}")
	public boolean updateUser(@PathVariable("id") String userId,@RequestBody SystemUser user) {
		   return userService.update(user,userId);
   }
	
	@RequestMapping("/getuserbyid/{id}")
	public SystemUser getUserById(@PathVariable("id") String userId) {
		  SystemUser user=userService.getUserById(userId);
		  return user;
   }
}


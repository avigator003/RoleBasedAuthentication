package in.avigator.controller;

import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public SystemUser login(@RequestBody SystemUser user) {
		 return userService.login(user.getUserName(), user.getPassword());
	}
	
	@RequestMapping("/getusers")
	public List<SystemUser> getUsers() {
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
	
	@PostMapping("/changestatus/{id}")
	public void changeStatus(@PathVariable("id") String userId,@RequestBody String status) throws JSONException {
	  JSONObject jsonObject= new JSONObject(status);
	 userService.changeStatus(userId, jsonObject.getBoolean("status"));	  
	}
	
	@RequestMapping("/delete/{id}")
	public boolean deleteUser(@PathVariable("id") String userId) {
		   return userService.delete(userId);
		 }
	
	
	
}


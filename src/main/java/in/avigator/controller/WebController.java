package in.avigator.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.avigator.Model.SystemUser;
import in.avigator.service.SystemUserService;

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
		  return userService.getUsers();
    }
}

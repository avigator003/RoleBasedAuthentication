package in.avigator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class RoleBasedAuthenticationApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoleBasedAuthenticationApplication.class, args);
	}

}


package in.avigator.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="system_user")
public class SystemUser 
{
	@Id
	  @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
    strategy = "org.hibernate.id.UUIDGenerator"
    )
	@Column(name = "user_id")
	private String userId;

	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "roles")
	private String roles;
	
	
	@Column(name = "isactive")
	private Boolean isActive;

	public SystemUser() {
		super();
	}
	
	public SystemUser(String userId, String user_name, String mobile, String password, String roles,
			Boolean isActive) {
		super();
		this.userId = userId;
		this.userName = user_name;
		this.mobile = mobile;
		this.password = password;
		this.roles = roles;
		this.isActive = isActive;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

		public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}
	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", user_name=" + userName + ", mobile=" + mobile + ", password=" + password
				+ ", roles=" + roles + ", isActive=" + isActive + "]";
	}
	
	public void update(SystemUser user) 
	{
		this.setUserName(user.getUserName());
		this.setPassword(user.getPassword());
		this.setRoles(user.getRoles());
	}
	
	
}

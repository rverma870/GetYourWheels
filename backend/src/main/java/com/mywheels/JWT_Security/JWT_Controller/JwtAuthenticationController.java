package com.mywheels.JWT_Security.JWT_Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.ExpiredJwtException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mywheels.DTO.UserDTO;
import com.mywheels.JWT_Security.JWT_Model.JwtRequest;
import com.mywheels.JWT_Security.JWT_Service.UserDetailsServiceImpl;
import com.mywheels.JWT_Security.JWT_Util.JwtUtil;
import com.mywheels.Model.User;
import com.mywheels.Service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;
 
	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private UserService userService;

	
	//This helps to login or create token to access other Api
	@PostMapping("/Login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest , HttpServletResponse response) throws Exception {

		try {
            //here we are giving email and password given by user to authenticate it with the stored credential 
            //in the data base. It is done by using the "global configure" method in "WebSecurityConfig.java"
            //there we are providing userDetailService obj(This obj have loadByUserName method which helps to 
            // get the user from data base) and password encoder to authenticationManager
            // to find the credential from database.  
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));

		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			System.out.println("input credential are wrong \n\n\n");
			throw new Exception("INVALID_CREDENTIALS", e);
		} catch(UsernameNotFoundException e){
			
			throw new Exception("Bad Credentials from controller");
		}

		final UserDetails userDetails = userDetailsServiceImpl
				.loadUserByUsername(authenticationRequest.getEmail());

		User user =  userService.getUserByEmail(authenticationRequest.getEmail()).get();
		UserDTO userDTO = new UserDTO(user.getId(),user.getName(),user.getEmail(),user.getMobile(),user.getAddress(),user.getRole(),user.getCartId(),user.getOrderListId());

		final String token = jwtTokenUtil.generateToken(userDetails);

		ResponseCookie resCookie = ResponseCookie.from("JWT_token",token)
            .httpOnly(true)
            .sameSite("None")
            .secure(true)
            .path("/")
            .maxAge(Math.toIntExact(12*60*60))
            .build();
    	response.addHeader("Set-Cookie", resCookie.toString());

		
		return ResponseEntity.ok().body(userDTO);
		// return ResponseEntity.ok("User successfully LoggedIn");
	}


	@RequestMapping(value = {"/Logout","/authenticate/{validate}"}, method = RequestMethod.GET)
	public ResponseEntity<?> deleteAuthenticationToken(@PathVariable( required = false, value = "validate") String authenticate, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Cookie[] resCookiee = request.getCookies();		

		String jwtToken = null;
		String username = null;
		if (resCookiee != null) {

			Cookie cook;
			for (int i = 0; i < resCookiee.length; i++) {
				cook = resCookiee[i];
				if(cook.getName().equalsIgnoreCase("JWT_token"))
						jwtToken=cook.getValue();	
			}    
			if(jwtToken==null){
				return ResponseEntity.status(HttpStatus.IM_USED).body("Token is invalid");
			}
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		} else {
				
			System.out.println("Cookie is expired or not found (from jwtauthenticationController.java)");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cookie is expired or not found");
		}


		// Once we get the token then validate it.
		if (username != null) {

			UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(username);

			// if token is valid configure Spring Security to manually set
			// authentication
			if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {

				if( authenticate!=null && authenticate.equals("{validate}")){
					User user =  userService.getUserByEmail(username).get();
					UserDTO userDTO = new UserDTO(user.getId(),user.getName(),user.getEmail(),user.getMobile(),user.getAddress(),user.getRole(),user.getCartId(),user.getOrderListId());
					return ResponseEntity.ok().body(userDTO);
				}else{
					ResponseCookie resCookie = ResponseCookie.from("JWT_token","")
					.httpOnly(true)
					.sameSite("None")
					.secure(true)
					.path("/")
					.maxAge(Math.toIntExact(0))
					.build();
				response.addHeader("Set-Cookie", resCookie.toString());	
				}
			}
			else{
				return ResponseEntity.badRequest().body("Token is invalid");	
			}
		}

		return ResponseEntity.ok("User successfully Logged Out");
	}
}

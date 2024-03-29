package com.mywheels.JWT_Security.JWT_Filter;


import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mywheels.JWT_Security.JWT_Service.UserDetailsServiceImpl;
import com.mywheels.JWT_Security.JWT_Util.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
    
	@Autowired
	private JwtUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		// final String requestTokenHeader = request.getHeader("Authorization");
		Cookie[] resCookiee = request.getCookies();		

		String username = null;
		String jwtToken = null;
		// // JWT Token is in the form "Bearer token". Remove Bearer word and get
		// // only the Token
		// if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
		// 	jwtToken = requestTokenHeader.substring(7);
		// 	try {
		// 		username = jwtTokenUtil.getUsernameFromToken(jwtToken);
		// 	} catch (IllegalArgumentException e) {
		// 		System.out.println("Unable to get JWT Token");
		// 	} catch (ExpiredJwtException e) {
		// 		System.out.println("JWT Token has expired");
		// 	}
		// } else {
		// 	logger.warn("JWT Token is null or does not begin with Bearer String");
		// }

		if (resCookiee != null) {

			Cookie cook;
			for (int i = 0; i < resCookiee.length; i++) {
				cook = resCookiee[i];
				if(cook.getName().equalsIgnoreCase("JWT_token"))
						jwtToken=cook.getValue();	
			}    

			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token from filter");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		} else {
			logger.warn("JWT Token is null (From JWTFilter.java)");
		}



		// Once we get the token validate it.
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(username);

			// if token is valid configure Spring Security to manually set
			// authentication
			if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {

				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// After setting the Authentication in the context, we specify
				// that the current user is authenticated. So it passes the
				// Spring Security Configurations successfully.
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}else{
				logger.warn("token is not validated..... ");
			}
		}
		chain.doFilter(request, response);
	}
}
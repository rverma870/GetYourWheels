package com.mywheels.JWT_Security.JWT_Configuration;

import java.util.List;

import com.mywheels.JWT_Security.JWT_Filter.JwtAuthenticationEntryPoint;
import com.mywheels.JWT_Security.JWT_Filter.JwtFilter;
import com.mywheels.JWT_Security.JWT_Service.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private JwtFilter jwtFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImpl);
  }

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {

		// httpSecurity.cors();
		// // .configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

		httpSecurity.cors().configurationSource(request -> {
			var cors = new CorsConfiguration();
			// cors.setAllowedOrigins(List.of("http://localhost:3000"));
			cors.setAllowedOrigins(List.of("https://getyourwheels.herokuapp.com"));
			cors.setAllowedMethods(List.of("GET","POST", "PUT", "DELETE", "OPTIONS"));
			cors.setAllowedHeaders(List.of("Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Request-Method",
                        "Access-Control-Request-Headers"));
			cors.setExposedHeaders(List.of("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));			
			cors.setAllowCredentials(true);
			return cors;
		});
		httpSecurity.csrf().disable()
				// dont authenticate this particular request
				.authorizeRequests().antMatchers("/Login","/Registration/**","/authenticate/**","/product/**","/file/**").permitAll()
				// all other requests need to be authenticated
				// .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
				.antMatchers("/dealer/**").hasAnyRole("DEALER","ADMIN")
				.antMatchers("/user/**").hasAnyRole("USER","DEALER","ADMIN")
				// .antMatchers("/**").permitAll()
				.anyRequest().authenticated()
                .and()
				// make sure we use stateless session; session won't be used to
				// store user's state.
				.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		// Add a filter to validate the tokens with every request
		httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}


	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
		// return NoOpPasswordEncoder.getInstance();
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	// @Bean
    // CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();
    //     configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
	// 	configuration.setAllowedHeaders(Arrays.asList("*"));
    //     // configuration.setAllowedMethods(Arrays.asList("GET","POST"));
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", configuration);
    //     return source;
    // }
}

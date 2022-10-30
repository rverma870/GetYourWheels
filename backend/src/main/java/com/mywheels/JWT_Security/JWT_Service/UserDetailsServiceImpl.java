package com.mywheels.JWT_Security.JWT_Service;

// import java.util.ArrayList;
import java.util.Optional;

import com.mywheels.Model.User;
import com.mywheels.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    @Lazy
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        //fetching user by email from database ====

        Optional<User> user = userService.getUserByEmail(email);

        if(user==null){
            throw new UsernameNotFoundException("could not found User details !!");
        }else{
            // customUserDetails = new CustomUserDetails(user);
            return user.map(CustomUserDetails::new).get();
            
            // // return customUserDetails;
            // return new org.springframework.security.core.userdetails.User(customUserDetails.getUsername(), customUserDetails.getPassword(), customUserDetails.getAuthorities());

            // return customUserDetails;
            // return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),customUserDetails.getAuthorities());
        }

            // if(email.equals("r@g.com")){
            //     return new org.springframework.security.core.userdetails.User("r@g.com","123",new ArrayList<>()); 
            // }else{
            //     throw new UsernameNotFoundException("user toh nhi mila");
            // }

    }
    
}

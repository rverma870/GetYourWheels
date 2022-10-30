package com.mywheels.Controller;

import java.util.ArrayList;
import java.util.List;

import com.mywheels.DTO.UserDTO;
import com.mywheels.Model.Address;
import com.mywheels.Model.Role;
import com.mywheels.Model.User;
import com.mywheels.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
    
    @Autowired
    UserService userService;

    @GetMapping("/user/getUserById/{id}")
    public ResponseEntity<User> getAllUser(@PathVariable("id") String id){

        User user = userService.getUserById(id);

        if(user==null){
            
            System.out.println("user is null _____ from usercontroller" + "\n\n\n\n");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @PostMapping("/Registration")
    public ResponseEntity<String> AddUser(@RequestBody User user){
        
        
        System.out.println(user+ " this is user from usercontroller from registration \n\n\n\n");
        
        List<Role> roles = new ArrayList<>();
        roles.add(new Role("ROLE_USER"));
        user.setRole(roles);
       
        try {
            userService.AddUser(user);
            return ResponseEntity.ok("User Registered Successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SEE_OTHER).body("User Already Present");
        }
    } 

    @PostMapping("/user/addAddress/{userId}")
    public ResponseEntity<?> AddUserAddress(@PathVariable String userId ,@RequestBody Address address){
        
        System.out.println(address + " this is coming address obj from usercontroller.java \n\n\n\n");

        User user = userService.getUserById(userId);

        if(user.getAddress().isEmpty()){
            
            List<Address> newAddress = new ArrayList<>();
            newAddress.add(address);
            user.setAddress(newAddress);
        }else{
           
            if(!user.getAddress().contains(address)){
                user.getAddress().add(address);
            }
        }
        
        userService.updateUser(user);
        UserDTO userDTO = new UserDTO(user.getId(),user.getName(),user.getEmail(),user.getMobile(),user.getAddress(),user.getRole(),user.getCartId(),user.getOrderListId());

        return ResponseEntity.ok().body(userDTO);
    } 

    @PutMapping("/user/update")
    public ResponseEntity<String> updateUser(@RequestBody User user){
        
        try {
            userService.updateUser(user);
            return ResponseEntity.ok("User updated successfully");   
        } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can't update User ");
        }
    }

    @DeleteMapping("/user/deleteById/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") String id){

        try {
            userService.removeUserById(id);    
            return ResponseEntity.ok("User deleted Successfully");   
        } catch (Exception e) {
            e.printStackTrace();
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("cant delete user ");
        }
    }

}

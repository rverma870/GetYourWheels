package com.mywheels.Service;

import java.util.List;
import java.util.Optional;

import com.mywheels.Model.Cart;
import com.mywheels.Model.User;
import com.mywheels.Model.UserOrderList;
import com.mywheels.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
   
    @Autowired
    private CartService cartService;
    
    @Autowired 
    private UserOrderListService userOrderListService;

    @Autowired
    private EmailService emailService;

    public List<User> getAllUsers(){

        return userRepository.findAll();
    }

    public User getUserById(String id) {

        return userRepository.findById(id).orElse(null);
    }

    public Optional<User> getUserByEmail(String email){
        
        return userRepository.findByEmail(email);
    }

    public void AddUser(User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.insert(user);

        Cart cart = new Cart();
        cart.setUserId(user.getId());
        cart = cartService.addCart(cart);

        UserOrderList userOrderList = new UserOrderList();
        userOrderList.setUserId(user.getId());
        userOrderList = userOrderListService.addOderList(userOrderList);

        user.setCartId(cart.getId());
        user.setOrderListId(userOrderList.getId());
        userRepository.save(user);

        User finalUser = user;

        Thread t = new Thread(){
            public void run(){
                    //task to complete after returning response
                   RegistrationSuccessfullEmailResponse(finalUser);
            }
        };
        t.start();
    }

    public void updateUser(User user){
        
        // User presentUser = userRepository.findByEmail(user.getEmail()).get();
        // user.setId(presentUser.getId());
        userRepository.save(user);
    }

    public void removeUserById(String id){

        userRepository.deleteById(id);
    }


    
    public void RegistrationSuccessfullEmailResponse(User userDetail ){

        String messagebody = "Hello " + userDetail.getName() + ",";
        messagebody +="\n\n You have successfully registered To MyWheels.com";
        messagebody +="\n Explore Details of different vehical of your choice and Book Trail to experiance them at a reasonable price. ";
        messagebody +="\n\n\n ThankYou";

        String subject = "Registration Successfull";
        emailService.sendEmail(subject, messagebody, userDetail.getEmail());
    }

}

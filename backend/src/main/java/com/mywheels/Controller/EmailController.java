package com.mywheels.Controller;

import com.mywheels.Service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class EmailController {
    
    @Autowired
    private EmailService emailService;

    

    @GetMapping("/sendMail/orderplaced")
    public void sendMail(){
        String messagebody = "Hello Dear,";
        messagebody +="\n\n Your Order is Placed SuccessFully \n\n\n ThankYou";
        emailService.sendEmail("test mail", messagebody, "rverma870@gmail.com");
    }

}

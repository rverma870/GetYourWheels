package com.mywheels.Service;

// import java.io.File;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${email.sender}")
    private String sender;
    @Value("${email.password}")
    private String password;

    public void sendEmail(String subject, String message, String to){

        //Variable for Gmail Host
        String host = "smtp.gmail.com";

        //get the system properties
        Properties properties = System.getProperties();

        //setting inportant information to properties object 

        //host set 
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        //Step 1: to get the session object ..
        Session session = Session.getInstance(properties, new Authenticator(){
            
            @Override
            protected PasswordAuthentication getPasswordAuthentication(){
                return new PasswordAuthentication(sender ,password);
            }
        });

        session.setDebug(true);

        //Step 2 : compose the message [text, multi media]
        MimeMessage ComposedMessage = new MimeMessage(session);


        try {
            //sender email
            ComposedMessage.setFrom(sender);

            //add Recipient
            ComposedMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            //adding subject to message 
            ComposedMessage.setSubject(subject);

            // //adding text to message 
            // ComposedMessage.setText(message);

            //adding attachment And text both... 
            //FILE PATH 
            // String pathOfAttachment = "C:\\Users\\DELL.5440\\Desktop\\test.jpg";

            MimeMultipart mimeMultipart = new MimeMultipart();

            //adding text and file
            MimeBodyPart textMime = new MimeBodyPart();
            // MimeBodyPart fileMime = new MimeBodyPart();

            try {
                textMime.setText(message);
                
                // File file = new File(pathOfAttachment);
                // fileMime.attachFile(file);

                // mimeMultipart.addBodyPart(fileMime);
                mimeMultipart.addBodyPart(textMime);

            } catch (Exception e) {
                
                e.printStackTrace();
            }

            ComposedMessage.setContent(mimeMultipart);

            //send mail
            //Step 3 :: send the message using Transport class
            Transport.send(ComposedMessage);

            System.out.println("email Sent successfully ...... \n\n\n\n");

        } catch (MessagingException e) {
           
            e.printStackTrace();
        }





    }
}

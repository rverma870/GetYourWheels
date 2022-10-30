package com.mywheels.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "Addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    
    private String houseNo;
    private String street;
    private String state;
    private String city;
    private int pincode;
    private String landmark;
    private String country;

}

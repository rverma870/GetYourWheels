package com.mywheels.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "Variants")
@Data
public class Variants {
    
    private String variantName;
    private double price;
    private String fuelType;
    private String transmissionType;
    private String engine;
    private String mileage;
}

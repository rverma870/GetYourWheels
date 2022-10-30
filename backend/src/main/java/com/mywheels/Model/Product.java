package com.mywheels.Model;

import java.util.List;

import com.mongodb.lang.NonNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "Products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    private String id;
    @NonNull
    @Indexed(unique = true)
    private String productName;
    private String company;
    private String category;
    private List<Variants> variants;
    private double startingPrice;
    private double finalPrice;
    private String discription;
    private String safetyRating;
    private int noOfSeats;
    private double bhp;
    private int sellCount= 0;
    private double rating = 0;
    private int rateCount = 0;
    @NonNull
    private List<String> image;
    private String thumbnail;
    @Field(targetType = FieldType.OBJECT_ID)
    private List<String> dealerId;
}






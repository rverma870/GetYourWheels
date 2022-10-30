package com.mywheels.DTO;

import java.util.List;

import com.mywheels.Model.Variants;
import com.mywheels.Model.VehicalBrands;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private String id;
    private String productName;
    private VehicalBrands company;
    private String category;
    private List<Variants> variants;
    private int startingPrice;
    private int finalPrice;
    private String discription;
    private String safetyRating;
    private int noOfSeats;
    private int bhp;
    private int sellCount= 0;
    private int rating = 0;
    private int rateCount = 0;
    private List<String> images;
    private String thumbnail;
}

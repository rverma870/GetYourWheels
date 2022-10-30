package com.mywheels.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "VehicalBrands")
@NoArgsConstructor
@AllArgsConstructor
public class VehicalBrands {
   
    @Id
    private String id;
    @Indexed(unique = true)
    private String brandName;
    private String brandImageURI;

    public VehicalBrands(String company,String uri) {
        this.brandName = company;
        this.brandImageURI = uri;
    }
}

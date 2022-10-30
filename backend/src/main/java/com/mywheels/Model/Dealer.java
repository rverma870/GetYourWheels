package com.mywheels.Model;

import java.util.Collections;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "Dealers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dealer {
    
    @Id
    private String id;
    private String dealerName;
    private String dealerCompany;
    private String email;
    private String gst_NO;
    @Field(name = "userId", targetType = FieldType.OBJECT_ID)
    private String userId;
    @Field(targetType = FieldType.OBJECT_ID)    
    private List<String> productId = Collections.emptyList();
}

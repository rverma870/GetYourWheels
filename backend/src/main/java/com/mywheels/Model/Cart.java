package com.mywheels.Model;

import java.util.Collections;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "Cart")
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    @Id
    private String id;
    @Field(targetType = FieldType.OBJECT_ID)
    @Indexed(unique = true)
    private String userId;
    @Field( targetType = FieldType.OBJECT_ID)
    private List<String> products = Collections.emptyList();
}

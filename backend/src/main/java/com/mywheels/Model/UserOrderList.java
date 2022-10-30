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

@Data
@Document(collection = "UserOrderList")
@NoArgsConstructor
@AllArgsConstructor
public class UserOrderList {
    @Id
    private String id;
    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    @Field(targetType = FieldType.OBJECT_ID)
    private List<String> orderIds = Collections.emptyList();
}

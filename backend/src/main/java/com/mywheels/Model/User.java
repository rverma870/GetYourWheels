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
@Document(collection = "User")
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String mobile;
    private List<Address> address;
    private List<Role> role = Collections.emptyList();
    @Field(targetType = FieldType.OBJECT_ID)
    private String cartId;
    @Field(targetType = FieldType.OBJECT_ID)
    private String orderListId;
    
    public User(User user) {

        this.name = user.getName();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.role = user.getRole();
    }
}

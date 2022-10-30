package com.mywheels.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "Roles")
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    private String id;
    // @DBRef
    private String RoleName;

    public Role(String RoleName) {
        this.RoleName= RoleName;
    }
}

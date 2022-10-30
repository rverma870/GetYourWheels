package com.mywheels.DTO;

import java.util.List;

import com.mywheels.Model.Address;
import com.mywheels.Model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
  
    private String id;
    private String name;
    private String email;
    private String mobile;
    private List<Address> address;
    private List<Role> role;
    private String cartId;
    private String orderId;
}

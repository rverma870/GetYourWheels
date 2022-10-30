package com.mywheels.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.mywheels.Model.Amount;
import com.mywheels.Model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOrdersDTO {
    
    private String orderId;
    private String userId;
    private List<Product> products;
    private String address;
    private Amount amount;
    private String modeOfPayment;
    private String status;
    private LocalDate orderDate;
    private LocalTime orderTime;
}

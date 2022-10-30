package com.mywheels.DTO;

import java.util.List;

import com.mywheels.Model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
   private List<Product> products;
}

package com.mywheels.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Amount {
    private double subTotal;
    private double gst;
    private double totalAmount;
}

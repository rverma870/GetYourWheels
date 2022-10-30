package com.mywheels.Model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;
    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    @Field(targetType = FieldType.OBJECT_ID)
    private List<String> productIds;
    private String address;
    private Amount amount;
    private String currency;
    private String modeOfPayment;
    private String razOrderId ;
    private String razPaymentId;
    private String razSignature;
    private String transactionStatus;
    private String paymentStatus="unpaid";
    private String deliveryStatus="open";
    LocalDate orderDate = LocalDate.now();
    LocalTime orderTime = LocalTime.now();
}

package com.mywheels.Repository;

import com.mywheels.Model.Order;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order,String> {
    
}

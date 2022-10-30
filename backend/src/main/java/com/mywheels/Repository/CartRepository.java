package com.mywheels.Repository;

import com.mywheels.Model.Cart;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart,String> {
    Cart findByUserId(String userId);
}

package com.mywheels.Repository;

import com.mywheels.Model.UserOrderList;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserOrderListRepository extends MongoRepository<UserOrderList,String> {
    
}

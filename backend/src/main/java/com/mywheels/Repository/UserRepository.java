package com.mywheels.Repository;

import java.util.Optional;

import com.mywheels.Model.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {
    
    // User findByEmail(String email);
    Optional<User> findByEmail(String email);
}

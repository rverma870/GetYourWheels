package com.mywheels.Repository;

import java.util.Optional;

import com.mywheels.Model.Dealer;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface DealerRepository extends MongoRepository<Dealer,String> {
   
    Optional<Dealer> findByEmail(String email);
}

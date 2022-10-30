package com.mywheels.Repository;

import com.mywheels.Model.VehicalBrands;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface VehicalBrandsRepository extends MongoRepository<VehicalBrands,String>{
   
    VehicalBrands findByBrandName(String brandName);
}

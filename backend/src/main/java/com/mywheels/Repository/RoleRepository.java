package com.mywheels.Repository;

import com.mywheels.Model.Role;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role,String>{
    
}

package com.mywheels.Service;

import java.util.List;

import com.mywheels.Model.VehicalBrands;
import com.mywheels.Repository.VehicalBrandsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehicalBrandService {
    @Autowired
    VehicalBrandsRepository vehicalBrandsRepository;
    
    public List<VehicalBrands> getAllBrands(){
        return vehicalBrandsRepository.findAll();
    }

    public VehicalBrands getBrandByName(String brandName){
        return vehicalBrandsRepository.findByBrandName(brandName);
    }
    
    public void AddBrands (VehicalBrands vehicalBrand) {
        vehicalBrandsRepository.save(vehicalBrand);
    }

}

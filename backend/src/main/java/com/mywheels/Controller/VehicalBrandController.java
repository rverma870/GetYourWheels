package com.mywheels.Controller;

import java.util.List;

import com.mywheels.Model.VehicalBrands;
import com.mywheels.Service.VehicalBrandService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins="http://localhost:3000")
public class VehicalBrandController {
    
    @Autowired
    VehicalBrandService vehicalBrandService;

    @GetMapping("/product/get/BrandImages")
    public ResponseEntity<?> getAllBrandsImages(){

        List<VehicalBrands> AllBrands = vehicalBrandService.getAllBrands();  
        return new ResponseEntity<List<VehicalBrands>>(AllBrands,HttpStatus.OK);
    }

}

package com.mywheels.Controller;

import java.util.List;

import com.mywheels.Model.Product;
import com.mywheels.Service.ProductService;
import com.mywheels.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class AdminController {
    
    @Autowired
    ProductService productService;

    @Autowired
    UserService userService;

    @GetMapping("/admin/all" )
    public List<Product> getAlProducts(){
        return productService.getAllProduct();
    }

}

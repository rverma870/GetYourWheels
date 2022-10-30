package com.mywheels.Controller;

import java.util.ArrayList;
import java.util.List;

import com.mywheels.Model.Dealer;
import com.mywheels.Model.Product;
import com.mywheels.Model.Role;
import com.mywheels.Model.User;
import com.mywheels.Service.DealerService;
import com.mywheels.Service.ProductService;
import com.mywheels.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins="http://localhost:3000")
public class DealerController {
    
    @Autowired
    DealerService dealerService;

    @Autowired
    UserService userService;
    
    @Autowired
    ProductService productService;

    @GetMapping("/dealer/getAllProductById/{id}")
    public ResponseEntity<List<Product>> getDealerAllProducts(@PathVariable("id") String dealerId ) {

        Dealer dealer = dealerService.getDealerObjById(dealerId);

        List<Product> products = new ArrayList<>();

        dealer.getProductId().forEach(e-> products.add(productService.getProductById(e)));

        return ResponseEntity.ok().body(products);
    }
    @GetMapping("/dealer/getAllProducts")
    public ResponseEntity<List<Product>> getDealerAllProductsByEmail() {


        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String CurrentLoggedInUserEmail="";
        if (principal instanceof UserDetails) {
            CurrentLoggedInUserEmail = ((UserDetails)principal).getUsername();
        } 

        Dealer dealer = dealerService.getDealerByEmail(CurrentLoggedInUserEmail);

        List<Product> products = new ArrayList<>();

        dealer.getProductId().forEach(e-> products.add(productService.getProductById(e)));

        return ResponseEntity.ok().body(products);
    }

    @PostMapping("Registration/dealer/add")
    public ResponseEntity<String> postDealerAdd(@RequestBody Dealer dealer){
        
        User user = userService.getUserByEmail(dealer.getEmail()).get();
        
        user.getRole().add(new Role("ROLE_DEALER"));
        userService.updateUser(user);
        
        dealer.setUserId(user.getId());

        dealerService.addDealer(dealer);
        return ResponseEntity.ok("Dealer added Successfully");
    }

    @PutMapping("/dealer/update/Dealers_productList/{productId}/{dealerId}")
    public String updateDealers_productList(@PathVariable("productId") String productId,@PathVariable("dealerId") String dealerId){

       dealerService.updateDealerProductList(productId, dealerId);
       return "ProductList updated successfully in dealers obj";
    }

    @DeleteMapping("/dealer/delete_product/{productId}")
    public String DeleteProductFromDealers_ProductList(@PathVariable("productId") String productId){

        dealerService.removeProductFromDealer_productList(productId);
        productService.removeDealerFromProducts_DealerList(productId);
        return "Dealer removed successfully From product obj";
    }


   
    

}

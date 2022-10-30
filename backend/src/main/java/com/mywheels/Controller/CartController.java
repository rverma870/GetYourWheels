package com.mywheels.Controller;

import java.util.ArrayList;
import java.util.List;

import com.mywheels.DTO.CartDTO;
import com.mywheels.Model.Cart;
import com.mywheels.Model.Product;
import com.mywheels.Service.CartService;
import com.mywheels.Service.ProductService;
import com.mywheels.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class CartController {
    
    @Autowired
    CartService cartService;
    @Autowired
    UserService userService;
    @Autowired
    ProductService productService;
    

    @GetMapping("/user/getCart/{cartid}")
    public ResponseEntity<?> getCartDetail(@PathVariable("cartid") String id){
        
        Cart cart =  cartService.getCartById(id);
        List<Product> products = new ArrayList<>();

        for(String e:cart.getProducts()){
            products.add(productService.getProductById(e));
        }
        
        CartDTO cartDTO = new CartDTO(products);
        return new ResponseEntity<CartDTO>(cartDTO,HttpStatus.OK);
    }

    @GetMapping("/user/addToCart/{cartId}/{productId}")
    public ResponseEntity<?> addToCart(@PathVariable("productId") String productId , @PathVariable("cartId") String cartId){
        
        cartService.addProductToCart(productId, cartId);
        return ResponseEntity.ok("Product Successfully added to cart");
    }

    @DeleteMapping("/user/deleteFromCart/{cartId}/{productId}")
    public ResponseEntity<?> DeleteFromCart(@PathVariable("productId") String productId , @PathVariable("cartId") String cartId){
        
        cartService.DeleteProductFromCart(productId, cartId);
        return ResponseEntity.ok("Product successfully deleted from the cart");
    }
}

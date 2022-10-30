package com.mywheels.Service;

import java.util.ArrayList;
import java.util.List;

import com.mywheels.Model.Cart;
import com.mywheels.Repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    @Autowired
    CartRepository cartRepository;

    public Cart getCartById(String id){

        return cartRepository.findById(id).get();
    }

    public Cart addCart(Cart cart){

        return cartRepository.insert(cart);
    }
    public Cart addProductToCart(String productId, String cartId){
        Cart cart = cartRepository.findById(cartId).get();
        if(cart.getProducts().isEmpty()){
            
            List<String> products = new ArrayList<>();
            products.add(productId);
            cart.setProducts(products);
        }else{
           
            if(!cart.getProducts().contains(productId)){
                cart.getProducts().add(productId);
            }
        }

        cartRepository.save(cart);
        return cart;
    }

    public void DeleteProductFromCart(String productId, String cartId){
        Cart cart = cartRepository.findById(cartId).get();
        if(!cart.getProducts().isEmpty()){
            cart.getProducts().removeIf(e-> e.contains(productId));
        }

        cartRepository.save(cart);
    }
}

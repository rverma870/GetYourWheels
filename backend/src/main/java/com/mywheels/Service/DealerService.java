package com.mywheels.Service;

import java.util.List;

import com.mywheels.Model.Dealer;
import com.mywheels.Repository.DealerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
public class DealerService {
    

    @Autowired
    DealerRepository dealerRepository;


    public Dealer getDealerObjById(String id){
        
        return dealerRepository.findById(id).get();
    }

    public Dealer getDealerByEmail(String email){
        
        return dealerRepository.findByEmail(email).get();
    }

    public void addDealer(Dealer dealer){
        dealerRepository.save(dealer);
    }

    public void updateDealerProductList(String productId,String dealerId){

        Dealer presentDealer = dealerRepository.findById(dealerId).get();

        List<String> presentProductListOfDealer = presentDealer.getProductId();

        presentProductListOfDealer.add(productId);
        dealerRepository.save(presentDealer);
    }

    public void removeProductFromDealer_productList(String productId){
       
        
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String CurrentLoggedInUserEmail="";
        if (principal instanceof UserDetails) {
            CurrentLoggedInUserEmail = ((UserDetails)principal).getUsername();
        }

        Dealer presentDealer = dealerRepository.findByEmail(CurrentLoggedInUserEmail).get();
        
        List<String> presentProductListOfDealer = presentDealer.getProductId();

        presentProductListOfDealer.removeIf(e-> e.contains(productId));
        presentDealer.setProductId(presentProductListOfDealer);
        
        dealerRepository.save(presentDealer);
   }
}

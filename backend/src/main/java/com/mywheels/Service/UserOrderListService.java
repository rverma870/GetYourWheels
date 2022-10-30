package com.mywheels.Service;

import java.util.ArrayList;
import java.util.List;

import com.mywheels.Model.UserOrderList;
import com.mywheels.Repository.UserOrderListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserOrderListService {
    
    @Autowired
    UserOrderListRepository userOrderListRepository;

    public UserOrderList getOrderListById(String OrderListId){

        return userOrderListRepository.findById(OrderListId).get();
    }

    public UserOrderList addOderList(UserOrderList userOrderList){

        return userOrderListRepository.insert(userOrderList);
    }

    public UserOrderList updateOderList(UserOrderList userOrderList){

        return userOrderListRepository.save(userOrderList);
    }

    public UserOrderList addOrderToOrderList(String orderId, String userOrderListId){
        UserOrderList userOrderList =  userOrderListRepository.findById(userOrderListId).get();

        if(userOrderList.getOrderIds().isEmpty()){
            
            List<String> newOrderList = new ArrayList<>();
            newOrderList.add(orderId);
            userOrderList.setOrderIds(newOrderList);
        }else{
           
            if(!userOrderList.getOrderIds().contains(orderId)){
                userOrderList.getOrderIds().add(orderId);
            }
        }

        userOrderListRepository.save(userOrderList);
        return userOrderList;
    }
}

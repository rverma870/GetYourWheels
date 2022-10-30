package com.mywheels.Controller;

import java.util.ArrayList;
import java.util.List;

import com.mywheels.DTO.UserOrdersDTO;
import com.mywheels.Model.Order;
import com.mywheels.Model.Product;
import com.mywheels.Model.UserOrderList;
import com.mywheels.Service.OrderService;
import com.mywheels.Service.ProductService;
import com.mywheels.Service.UserOrderListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class UserOrderListController {
    
    @Autowired
    UserOrderListService userOrderListService;

    @Autowired
    ProductService productService;

    @Autowired 
    OrderService orderService;

    @GetMapping("/user/getOrderList/{OrderListId}")
    public ResponseEntity<?> getCartDetail(@PathVariable("OrderListId") String OrderListId){
        
        UserOrderList userOrderList =  userOrderListService.getOrderListById(OrderListId);
        
        List<UserOrdersDTO> userOrdersListDTO = new ArrayList<>();
        for(String e:userOrderList.getOrderIds()){

            Order order = orderService.getOrderById(e);
            List<Product> products = new ArrayList<>();
            List<String> productIds = order.getProductIds();
            for(String x:productIds){
                products.add(productService.getProductById(x));
            }
            UserOrdersDTO userOrdersDTO = new UserOrdersDTO(order.getId(),order.getUserId(),products,order.getAddress(),order.getAmount(),order.getModeOfPayment(),order.getDeliveryStatus(),order.getOrderDate(),order.getOrderTime());
            userOrdersListDTO.add(userOrdersDTO);
        }
       
        return new ResponseEntity<List<UserOrdersDTO>>(userOrdersListDTO,HttpStatus.OK);
    }
}

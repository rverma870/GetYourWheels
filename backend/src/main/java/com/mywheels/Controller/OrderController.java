package com.mywheels.Controller;

import java.util.ArrayList;
import java.util.List;

import com.mywheels.DTO.UserOrdersDTO;
import com.mywheels.Model.Order;
import com.mywheels.Model.Product;
import com.mywheels.Service.OrderService;
import com.mywheels.Service.ProductService;
import com.razorpay.RazorpayException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @GetMapping("/user/getOrderById/{orderId}")
    public ResponseEntity<?> getCartDetail(@PathVariable("orderId") String orderId){
        
        Order order =  orderService.getOrderById(orderId);
        List<Product> products = new ArrayList<>();

        for(String e:order.getProductIds()){
            products.add(productService.getProductById(e));
        }
        
        UserOrdersDTO userOrdersDTO = new UserOrdersDTO(order.getId(),order.getUserId(),products,order.getAddress(),order.getAmount(),order.getModeOfPayment(),order.getDeliveryStatus(),order.getOrderDate(),order.getOrderTime());
        return new ResponseEntity<UserOrdersDTO>(userOrdersDTO,HttpStatus.OK);
    }

    @PostMapping("user/placeOrder")
    public ResponseEntity<?> placeNewOrder(@RequestBody Order order) throws RazorpayException{

        Order initialCreatedOrder = orderService.addNewOrder(order);
        return new ResponseEntity<Order>(initialCreatedOrder,HttpStatus.OK);
    }

    @PostMapping("user/completeTransaction")
    public ResponseEntity<?> completePendingOrder(@RequestBody Order order) {

        Order completedOrder = orderService.CompleteTransaction(order);
        return new ResponseEntity<Order>(completedOrder,HttpStatus.OK);
    }

    @DeleteMapping("user/removeOrder/{orderId}")
    public ResponseEntity<?> removeOrder(@PathVariable("orderId") String orderId){

        String msg = orderService.DeletefailedPaymentOrder(orderId);
        return ResponseEntity.ok(msg);
    }

    @DeleteMapping("user/cancelOrder/{userId}/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable("orderId") String orderId,@PathVariable("userId") String userId){

        String msg = orderService.CancelOrder(orderId, userId);
        return ResponseEntity.ok(msg);
    }

}

package com.mywheels.Service;

import com.mywheels.Model.Order;
import com.mywheels.Model.User;
import com.mywheels.Model.UserOrderList;
import com.mywheels.Repository.OrderRepository;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.razorpay.*;


@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserOrderListService userOrderListService;

    @Autowired
    UserService userService;

    @Autowired
    private EmailService emailService;


    public Order getOrderById(String orderId){
        return orderRepository.findById(orderId).get();
    }

    public Order addNewOrder(Order newOrder) throws RazorpayException{
        
        // Requesting RazorPay server to initiate payment request....

        RazorpayClient client = new RazorpayClient("rzp_test_svUpXIg88rwFrC", "u51nktm0WDIraJlfo2ln5AzX");

        JSONObject obj = new JSONObject();

        //multiplying 100 to conver Rupee into paisa
        obj.put("amount", newOrder.getAmount().getTotalAmount()*100);
        obj.put("currency", "INR");
        obj.put("receipt", "txn_123456");

        //Creating New order 

        com.razorpay.Order razOrder = client.Orders.create(obj);
        
        System.out.println(razOrder + " this is RazOrder \n\n\n");

        newOrder.setTransactionStatus(razOrder.get("status"));
        newOrder.setRazOrderId(razOrder.get("id"));
        newOrder.setCurrency(razOrder.get("currency"));

        // Creating entry of new order in database 
        newOrder = orderRepository.insert(newOrder);
        return newOrder;
    }

    public Order CompleteTransaction(Order pendingOrder){

        Order orderToUpdate = orderRepository.findById(pendingOrder.getId()).get();
        orderToUpdate.setPaymentStatus(pendingOrder.getPaymentStatus());
        orderToUpdate.setRazPaymentId(pendingOrder.getRazPaymentId());
        orderToUpdate.setRazSignature(pendingOrder.getRazSignature());
        orderToUpdate.setTransactionStatus(pendingOrder.getTransactionStatus());

        orderRepository.save(orderToUpdate);

        String userId = pendingOrder.getUserId();
        User user = userService.getUserById(userId);
        userOrderListService.addOrderToOrderList(pendingOrder.getId(), user.getOrderListId());

      
        Thread t = new Thread(){
            public void run(){
                    //task to complete after returning response
                    OrderPlacedEmailResponse(user , orderToUpdate);
            }
        };
        t.start();

        return orderToUpdate;
    }

    public String DeletefailedPaymentOrder(String orderId){

        orderRepository.deleteById(orderId);
        return "Pending Payment failed Order removed Successfully";
    }


    public String CancelOrder(String orderId, String userId){
        orderRepository.deleteById(orderId);

        UserOrderList userOrderList = userOrderListService.getOrderListById(userService.getUserById(userId).getOrderListId());
        
        if(!userOrderList.getOrderIds().isEmpty()){
            userOrderList.getOrderIds().removeIf(e-> e.contains(orderId));
        }

        userOrderListService.updateOderList(userOrderList);

        return "Order Cancelled Successfully";
    }


    public void OrderPlacedEmailResponse(User userDetail , Order order){

        String messagebody = "Hello " + userDetail.getName() + ",";
        messagebody +="\n\n Your Order is Placed SuccessFully.";
        messagebody +="\n Amount of Order : " + order.getAmount().getTotalAmount();
        messagebody +="\n Your Delivery Address is : " + order.getAddress();
        messagebody +="\n\n Enjoy Your Free Trail";
        messagebody +="\n\n\n ThankYou";

        String subject = "Your Order Placed SuccessFully";
        emailService.sendEmail(subject, messagebody, userDetail.getEmail());
    }
}

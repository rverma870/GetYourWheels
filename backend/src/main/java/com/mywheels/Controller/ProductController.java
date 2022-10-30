package com.mywheels.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mywheels.Model.Product;
import com.mywheels.Model.Rating;
import com.mywheels.Model.VehicalBrands;
import com.mywheels.Service.DealerService;
import com.mywheels.Service.ProductService;
import com.mywheels.Service.VehicalBrandService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ProductController {
    

    @Autowired
    ProductService productService;
    @Autowired
    DealerService dealerService;
    @Autowired
    VehicalBrandService vehicalBrandService;


    ObjectMapper Obj = new ObjectMapper();

    @GetMapping(value = "/product/get/All")
    public ResponseEntity<?> getAllProducts() throws IOException{
      List<Product> allProducts = productService.getAllProduct();
      return new ResponseEntity<List<Product>>(allProducts,HttpStatus.OK);
    }

    @GetMapping(value = "/product/get/AllBySellCount")
    public ResponseEntity<?> getAllProductsBysellCount(){
        return ResponseEntity.ok().body(productService.getAllProductOnBasisOfSellCount());
    }

    @GetMapping(value = "/product/get/AllByRating")
    public ResponseEntity<?> getAllProductsByRating(){
        return ResponseEntity.ok().body(productService.getAllProductOnBasisOfRating());
    }

    @GetMapping("/product/get/AllByCategory/{category}")
    public ResponseEntity<?> getProductByCategory(@PathVariable String category){

        return new ResponseEntity<List<Product>>(productService.getAllProductsByCategory(category),HttpStatus.OK);
    }

    @GetMapping("/product/get/AllByCompany/{company}")
    public ResponseEntity<?> getProductByCompany(@PathVariable String company){

        return new ResponseEntity<List<Product>>(productService.getAllProductsByCompany(company),HttpStatus.OK);
    }

    @GetMapping("/product/get/filterProduct/{company}/{startRange}/{finalRange}/{category}/{sortBy}")
    public ResponseEntity<?> filterProduct(@PathVariable String company,@PathVariable double startRange,@PathVariable double finalRange ,@PathVariable String category ,@PathVariable String sortBy ){
    
        List<Product> ResponseProductList = new ArrayList<>();

        ResponseProductList = productService.filterProducts(company, startRange, finalRange, category, sortBy);

        return new ResponseEntity<List<Product>>(ResponseProductList,HttpStatus.OK);
    }    
   
    @GetMapping("product/get/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") String id){

        Product product = new Product();

        try {
            product = productService.getProductById(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        // ProductDTO productDTO = new ProductDTO(id,product.getProductName(),product.getCompany(),
        //                         product.getCategory(),product.getVariants(),product.getStartingPrice(),product.getFinalPrice(),
        //                         product.getDiscription(),product.getImage(),product.getThumbnail());

        return new ResponseEntity<Product>(product,HttpStatus.OK);
    }

    @GetMapping("/product/get/byName/{name}")
    public ResponseEntity<?> getProductByName(@PathVariable("name") String name){
        return new ResponseEntity<Product>(productService.getProductByProductName(name),HttpStatus.OK);
    }

    @PostMapping("/dealer/product/add")
    public ResponseEntity<String> postProductAdd(@RequestBody Product product){
        
        System.out.println(product + "\n\n\n\n");
        Product AlreadyExistProductObj = productService.getProductByProductName(product.getProductName());

        if(AlreadyExistProductObj == null){
            productService.addProduct(product);
        }
        else{
            productService.updateProducts_DealerList(product.getProductName());

            VehicalBrands AlreadyExistBrandObj = vehicalBrandService.getBrandByName(product.getCompany());
            if(AlreadyExistBrandObj == null){
                vehicalBrandService.AddBrands(new VehicalBrands(product.getCompany(),""));
            }
        }
       
        return ResponseEntity.ok("Product Added Successfully");
    }

    // @PutMapping("/dealer/product/update/product_DealerList/{productname}/{dealerId}")
    // public ResponseEntity<String> putProducts_DealerListUpdate(@PathVariable("productname") String productname,@PathVariable("dealerId") String dealerId){

    //     productService.updateProducts_DealerList(productname);
    //     return ResponseEntity.ok("Dealer add successfully in product obj");
    // }/*

    @PostMapping("/dealer/product/update/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable String id,@RequestBody Product newproduct){

        productService.updateProduct(id,newproduct);    
        return ResponseEntity.ok("Product updated successfully");
    } 
    
    @PutMapping("/user/product/updateRating/{id}")
    public ResponseEntity<String> updateProductRating(@PathVariable String id ,@RequestBody Rating newRating){

        Product product = productService.getProductById(id);

        double oldRating = product.getRating();
        int oldRateCount = product.getRateCount();

        double newRate = (oldRating*oldRateCount + newRating.getRating())/(oldRateCount+1);
        product.setRating(newRate);
        product.setRateCount(oldRateCount+1);
        productService.updateProduct(id,product);    
        return ResponseEntity.ok("Product updated successfully");
    } 

    @DeleteMapping("/admin/product/deleteByid/{id}")
    public ResponseEntity<String> DeleteProductById(@PathVariable String id){
        productService.removeProductById(id);
        return ResponseEntity.ok("product removed successfully");
    }

    @DeleteMapping("/dealer/product/delete_dealer/{productId}")
    public ResponseEntity<String> DeleteDealerFromProducts_DealerList(@PathVariable("productId") String productId){

        productService.removeDealerFromProducts_DealerList(productId);
        return ResponseEntity.ok("Product Successfully Removed");
    }

}

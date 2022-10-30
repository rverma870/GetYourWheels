package com.mywheels.Service;

import java.util.ArrayList;
import java.util.List;

import com.mywheels.Model.Dealer;
import com.mywheels.Model.Product;
import com.mywheels.Repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
        
    @Autowired
    DealerService dealerService;

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    public List<Product> getAllProductOnBasisOfSellCount(){
        return productRepository.findAll(Sort.by(Sort.Direction.DESC, "sellCount"));
    }

    public List<Product> getAllProductOnBasisOfRating(){
        return productRepository.findAll(Sort.by(Sort.Direction.DESC, "rating"));
    }

    public List<Product> getAllProductsByCategory(String category){
        return productRepository.findByCategory(category);
    }

    public List<Product> getAllProductsByCompany(String company){
        return productRepository.findByCompany(company);
    }

    public List<Product> filterProducts (String company , double startRange, double finalRange , String category, String sortBy){
        
        List<Product> ResProduct = new ArrayList<>();

        //Filter Product With Sorting ................
        if(!company.equals("") && !sortBy.equals("none")){

            //on the basis of all parameter and sorting in asc order.
            if(sortBy.equals("ASC") && !category.equals("none") && startRange!=-1 && finalRange!=-1 ){
            Sort sort = Sort.by(Sort.Direction.ASC, "startingPrice");
            ResProduct = productRepository.findByCompanyWithPriceRangeWithCategoryAndSort(company, startRange, finalRange, category,sort);
            }
            //on the basis of company and priceRange and sorting in ascending order.
            else if(sortBy.equals("ASC") && category.equals("none") && startRange!=-1 && finalRange!=-1 ){
                Sort sort = Sort.by(Sort.Direction.ASC, "startingPrice");
                ResProduct = productRepository.findByCompanyWithPriceRangeAndSorting(company, startRange, finalRange,sort);
            }
            //on the basis of company and category and sorting in asc order.
            else if(sortBy.equals("ASC") && !category.equals("none") && startRange==-1 && finalRange==-1 ){
                Sort sort = Sort.by(Sort.Direction.ASC, "startingPrice");
                ResProduct = productRepository.findByCompanyWithCategoryAndSorting(company,category,sort);
            }
            //on the basis of company only and sorting in asc order.
            else if(sortBy.equals("ASC") && category.equals("none") && startRange==-1 && finalRange==-1 ){
                Sort sort = Sort.by(Sort.Direction.ASC, "startingPrice");
                ResProduct = productRepository.findByCompanyAndSorting(company,sort);
            }            
            //on the basis of all parameter and sorting in desc order.
            else if(sortBy.equals("DESC") && !category.equals("none") && startRange!=-1 && finalRange!=-1 ){
                Sort sort = Sort.by(Sort.Direction.DESC, "startingPrice");
                ResProduct = productRepository.findByCompanyWithPriceRangeWithCategoryAndSort(company, startRange, finalRange, category,sort);
            }
            //on the basis of company and priceRange and sorting in decs order.
            else if(sortBy.equals("DESC") && category.equals("none") && startRange!=-1 && finalRange!=-1 ){
                Sort sort = Sort.by(Sort.Direction.DESC, "startingPrice");
                ResProduct = productRepository.findByCompanyWithPriceRangeAndSorting(company, startRange, finalRange,sort);
            }
            //on the basis of company and  category and sorting in desc order.
            else if(sortBy.equals("DESC") && !category.equals("none") && startRange==-1 && finalRange==-1 ){
                Sort sort = Sort.by(Sort.Direction.DESC, "startingPrice");
                ResProduct = productRepository.findByCompanyWithCategoryAndSorting(company,category,sort);
            }
            //on the basis of company only and sorting in desc order.
            else if(sortBy.equals("DESC") && category.equals("none") && startRange==-1 && finalRange==-1 ){
                Sort sort = Sort.by(Sort.Direction.DESC, "startingPrice");
                ResProduct = productRepository.findByCompanyAndSorting(company, sort);
            }
        }
        //Filter Product Witout Sorting.............
        else if(!company.equals("") && sortBy.equals("none")){

            //on the basis of all parameter without sorting
            if(startRange!=-1 && finalRange!=-1 && !category.equals("none") ){
              
                ResProduct = productRepository.findByCompanyWithPriceRangeWithCategory(company, startRange, finalRange, category);
            }
            // on the basis of company and priceRange
            else if(startRange!=-1 && finalRange!=-1 && category.equals("none")){
       
                ResProduct = productRepository.findByCompanyWithPriceRange(company, startRange, finalRange);
            }
            //on the basis of company and  category 
            else if(startRange==-1 && finalRange==-1 && !category.equals("none")){
                
                ResProduct = productRepository.findByCompanyWithCategory(company, category);
            }
            //on the basis of company only
            else if(startRange==-1 && finalRange==-1 && category.equals("none")){
                
                ResProduct = productRepository.findByCompany(company);
            }
        }

        return ResProduct;
    }
    
    public Product getProductById(String id){
        return productRepository.findById(id).get();
    }

    public Product getProductByProductName(String name){
        return productRepository.findByProductName(name);
    }

    public void addProduct(Product product){
        
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String CurrentLoggedInUserEmail="";
        if (principal instanceof UserDetails) {
            CurrentLoggedInUserEmail = ((UserDetails)principal).getUsername();
        }

        Dealer dealer = dealerService.getDealerByEmail(CurrentLoggedInUserEmail);
        
        List<String> dealersOfthisProduct = new ArrayList<String>();
        dealersOfthisProduct.add(dealer.getId());
        product.setDealerId(dealersOfthisProduct);
        product = productRepository.insert(product);

        dealer.getProductId().add(product.getId());
        dealerService.addDealer(dealer);
    }

    public void updateProduct(String id,Product newproducts){

        Product presentProduct = productRepository.findById(id).get();
        System.out.println(presentProduct + "   this is present product (from productservice.java)\n\n\n\n");
        newproducts.setId(presentProduct.getId());  
        productRepository.save(newproducts);
    }

    public void updateProducts_DealerList(String ProductName){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String CurrentLoggedInUserEmail="";
        if (principal instanceof UserDetails) {
            CurrentLoggedInUserEmail = ((UserDetails)principal).getUsername();
        }

        Dealer dealer = dealerService.getDealerByEmail(CurrentLoggedInUserEmail);


        Product presentProduct =  productRepository.findByProductName(ProductName);
        List<String> presentDealerList = presentProduct.getDealerId();
        presentDealerList.add(dealer.getId());
        productRepository.save(presentProduct);
    }

    public void removeProductById(String id){
        productRepository.deleteById(id);
    }

   public void removeDealerFromProducts_DealerList(String productId){


        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String CurrentLoggedInUserEmail="";
        if (principal instanceof UserDetails) {
            CurrentLoggedInUserEmail = ((UserDetails)principal).getUsername();
        }

        Dealer dealer = dealerService.getDealerByEmail(CurrentLoggedInUserEmail);

        Product presentProduct =  productRepository.findById(productId).get();
        List<String> presentDealerList = presentProduct.getDealerId();
        presentDealerList.removeIf(e-> e.contains(dealer.getId()));
        
        presentProduct.setDealerId(presentDealerList);

        productRepository.save(presentProduct);
   }
}

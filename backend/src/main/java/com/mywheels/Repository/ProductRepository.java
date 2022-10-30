package com.mywheels.Repository;

import java.util.List;

import com.mywheels.Model.Product;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ProductRepository extends MongoRepository<Product,String>{
    
    Product findByProductName(String productName);

    @Query("{'category': {'$regex': '^?0$', '$options':'i'}  }")
    List<Product> findByCategory(String category);
    
    List<Product> findByCompany(String company);


    //Filter Querry Starts----------

    //Sorting Querry.....
    
    //With All Filter Parameter 
    @Query(value = "{'company' : '?0', 'category': '?3' ,startingPrice : {$gte: ?1, $lte : ?2}  }")
    List<Product> findByCompanyWithPriceRangeWithCategoryAndSort(String company, double startRange, double finalRange, String category , Sort sort);

    //With Company And PriceRange Only
    @Query(value = "{'company' : '?0', startingPrice : {$gte: ?1, $lte : ?2}  }")
    List<Product> findByCompanyWithPriceRangeAndSorting(String company, double startRange, double finalRange ,Sort sort);

    //With Company And Category Only
    @Query(value = "{'company' : '?0', 'category': '?1' }")
    List<Product> findByCompanyWithCategoryAndSorting(String company, String category ,Sort sort);

    //With Company Only
    @Query(value = "{'company' : '?0' }")
    List<Product> findByCompanyAndSorting(String company, Sort sort);
    // Sorting Querry Ends......


    //Querry WithOut Sorting..........

    //With All Filter Parameter without sorting
    @Query(value = "{'company' : '?0', 'category': '?3' ,startingPrice : {$gte: ?1, $lte : ?2}  }")
    List<Product> findByCompanyWithPriceRangeWithCategory(String company, double startRange, double finalRange, String category);

    //With Company And PriceRange Only
    @Query(value = "{'company' : '?0', startingPrice : {$gte: ?1, $lte : ?2}  }")
    List<Product> findByCompanyWithPriceRange(String company, double startRange, double finalRange);

    //With Company And Category Only
    @Query(value = "{'company' : '?0', 'category': '?1' }")
    List<Product> findByCompanyWithCategory(String company, String category);

    //Querry Without Sorting Ends.........

    // Filter querry Ends --------------
}

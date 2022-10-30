package com.mywheels.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mywheels.DTO.VehicalBrandRequestDTO;
import com.mywheels.Model.VehicalBrands;
import com.mywheels.Service.AwsS3FileService;
import com.mywheels.Service.VehicalBrandService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class AwsFileController {
    
    @Autowired
    private AwsS3FileService awsS3FileService;

    @Autowired
    VehicalBrandService vehicalBrandService;

    @PostMapping("/dealer/uploadThumbnail")
    public ResponseEntity<?> uploadThumbnail(@RequestParam("Thumbnail") MultipartFile file){
            
        String PublicThumbnailURL = awsS3FileService.uploadFile(file,"Thumbnail/");

        Map<String, String> response = new HashMap<>();
        response.put("thumbnailURL", PublicThumbnailURL);

        return new ResponseEntity<Map<String,String>>(response,HttpStatus.CREATED);
    }

    @PostMapping("/dealer/uploadProductImage")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile[] file){

        List<String> productImagesURI=new ArrayList<String>();  

        for (MultipartFile multipartFile : file) {
                
                if(multipartFile.isEmpty()){
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request must contain file");
                }
                // if(!multipartFile.getContentType().equals("image/jpeg")){
                //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Only JPEG content allowed");
                // }

                //file upload code....
                String PublicImageURL = awsS3FileService.uploadFile(multipartFile,"ProductImage/");

                productImagesURI.add(PublicImageURL);
        }

        return new ResponseEntity<List<String>>(productImagesURI,HttpStatus.CREATED);
    }

    @PostMapping("/addBrands")
    public ResponseEntity<?> AddVeicalBrands(@ModelAttribute VehicalBrandRequestDTO vehicalBrandsRequestDTO) {
        
        String PublicBrandImageURL = awsS3FileService.uploadFile(vehicalBrandsRequestDTO.getBrandImageFile(), "BrandImage/");
        vehicalBrandService.AddBrands(new VehicalBrands(vehicalBrandsRequestDTO.getBrandName(), PublicBrandImageURL));

        return ResponseEntity.ok(PublicBrandImageURL);
    }
}

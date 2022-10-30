package com.mywheels.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
// import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AwsS3FileService {
    
    @Autowired
    private AmazonS3Client awsS3Client;    

    private String bucketName = "mywheelsimagebucket";

    public String uploadFile(MultipartFile file,String folderPath){

        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());

        String UniqueFileName = UUID.randomUUID().toString() + "." + extension;

        try {
            File convertedFile = convertMultipartToFile(file);
            awsS3Client.putObject(new PutObjectRequest(bucketName,folderPath+ UniqueFileName , convertedFile));
            convertedFile.delete();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error occured While uploading the file. ");
        }

        awsS3Client.setObjectAcl(bucketName,folderPath + UniqueFileName,CannedAccessControlList.PublicRead);
        
        return awsS3Client.getResourceUrl(bucketName, folderPath + UniqueFileName);
    }


    private File convertMultipartToFile(MultipartFile file) throws IOException{
        
        File convertedFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        
        return convertedFile;
        
    }
}

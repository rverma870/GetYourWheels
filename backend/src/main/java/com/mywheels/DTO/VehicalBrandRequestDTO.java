package com.mywheels.DTO;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicalBrandRequestDTO {
    private String brandName;
    private MultipartFile BrandImageFile;
}

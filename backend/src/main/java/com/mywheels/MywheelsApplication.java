package com.mywheels;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class MywheelsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MywheelsApplication.class, args);

		System.out.println("Started \n\n\n\n");
	}

}

package com.carepath;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CarePathApplication {
    public static void main(String[] args) {
        SpringApplication.run(CarePathApplication.class, args);
    }
}

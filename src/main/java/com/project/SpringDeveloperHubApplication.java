package com.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.controller", "com.service", "com.repository", "com.model"})
@EnableJpaRepositories(basePackages = "com.repository")
@EntityScan(basePackages = "com.model")
public class SpringDeveloperHubApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringDeveloperHubApplication.class, args);
        System.out.print("SpringDeveloperHubApplication is running..." );
    }
}

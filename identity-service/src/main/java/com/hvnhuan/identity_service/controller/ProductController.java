package com.hvnhuan.identity_service.controller;

import com.hvnhuan.identity_service.dto.request.ApiResponse;
import com.hvnhuan.identity_service.dto.request.ProductCreationRequest;
import com.hvnhuan.identity_service.dto.request.ProductUpdateRequest;
import com.hvnhuan.identity_service.entity.Product;
import com.hvnhuan.identity_service.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    ApiResponse<Product> createProduct(@RequestBody @Valid ProductCreationRequest request){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResult(productService.creationProduct(request));
        return apiResponse;
    }

    @GetMapping("/{productId}")
    Product getProduct(@PathVariable("productId") String productId){
        return productService.getProduct(productId);
    }

    @GetMapping
    List<Product> getProducts(){
        return productService.getProducts();
    }

    @PutMapping("/{productId}")
    Product updateProduct(@PathVariable("productId") String productId, @RequestBody ProductUpdateRequest request){
        return productService.updateProduct(productId, request);
    }

    @DeleteMapping("/{productId}")
    String deleteProduct(@PathVariable("productId") String productId){
        productService.deleteProduct(productId);
        return "Product has been deleted!";
    }
}

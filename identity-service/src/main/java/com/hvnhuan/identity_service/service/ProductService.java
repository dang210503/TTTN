package com.hvnhuan.identity_service.service;

import com.hvnhuan.identity_service.dto.request.ProductCreationRequest;
import com.hvnhuan.identity_service.dto.request.ProductUpdateRequest;
import com.hvnhuan.identity_service.entity.Product;
import com.hvnhuan.identity_service.exception.AppException;
import com.hvnhuan.identity_service.exception.ErrorCode;
import com.hvnhuan.identity_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product creationProduct(ProductCreationRequest request){
        if(productRepository.existsByname(request.getName()))
            throw new AppException(ErrorCode.PRODUCT_EXITED);

        Product product = new Product();
        product.setName(request.getName());
        product.setDetail(request.getDetail());
        product.setProductionDate(request.getProductionDate());
        product.setExpirationDate(request.getExpirationDate());
        return productRepository.save(product);
    }

    public Product getProduct(String id){
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getProducts (){
        return productRepository.findAll();
    }

    public Product updateProduct(String id, ProductUpdateRequest request){
        Product product = getProduct(id);
        product.setName(request.getName());
        product.setDetail(request.getDetail());
        product.setProductionDate(request.getProductionDate());
        product.setExpirationDate(request.getExpirationDate());

        return productRepository.save(product);
    }

    public void deleteProduct(String id){
        productRepository.deleteById(id);
    }
}

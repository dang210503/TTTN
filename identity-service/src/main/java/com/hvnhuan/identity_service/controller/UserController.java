package com.hvnhuan.identity_service.controller;

import com.hvnhuan.identity_service.dto.request.ApiResponse;
import com.hvnhuan.identity_service.dto.request.UserCreationRequest;
import com.hvnhuan.identity_service.dto.request.UserDeleteRequest;
import com.hvnhuan.identity_service.dto.request.UserUpdateRequest;
import com.hvnhuan.identity_service.entity.User;
import com.hvnhuan.identity_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest request){
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }
    @GetMapping("/{userId}")
    User getUser(@PathVariable("userId") String userId){
        return userService.getUser(userId);
    }

    @GetMapping
    List<User> getUsers(){
        return userService.getUsers();
    }

    @PutMapping("/{userId}")
    User updateUser(@PathVariable("userId") String userId,  @RequestBody UserUpdateRequest request){
        return userService.updateUser(userId, request);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") String userId){
        userService.deleteUser(userId);
    }

}

package com.hvnhuan.identity_service.service;

import com.hvnhuan.identity_service.dto.request.UserCreationRequest;
import com.hvnhuan.identity_service.dto.request.UserUpdateRequest;
import com.hvnhuan.identity_service.entity.User;
import com.hvnhuan.identity_service.exception.AppException;
import com.hvnhuan.identity_service.exception.ErrorCode;
import com.hvnhuan.identity_service.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser( UserCreationRequest request){

        User user = new User();

        if(userRepository.existsByUsername(request.getUsername())){
            throw new AppException(ErrorCode.USER_EXITED);
        }
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDob(request.getDob());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setRole(request.getRole() != null ? request.getRole() : com.hvnhuan.identity_service.entity.Role.PATIENT);

        return userRepository.save(user);

    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(String id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not foud"));
    }

    public User updateUser(String userId, UserUpdateRequest request){
        User user = getUser(userId);
        if(request.getPassword() != null) user.setPassword(request.getPassword());
        if(request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if(request.getLastName() != null) user.setLastName(request.getLastName());
        if(request.getDob() != null) user.setDob(request.getDob());
        if(request.getPhone() != null) user.setPhone(request.getPhone());
        if(request.getEmail() != null) user.setEmail(request.getEmail());
        if(request.getAddress() != null) user.setAddress(request.getAddress());
        if(request.getRole() != null) user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public void deleteUser(String userId){
        userRepository.deleteById(userId);
    }
}



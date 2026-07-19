package com.hvnhuan.identity_service.dto.request;

import com.hvnhuan.identity_service.entity.Role;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserCreationRequest {
    @Size(min = 3, message = "USERNAME_INVALID")
    private String username;

    @Size(min = 8, message = "INVALID_PASSWORD")
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String phone;
    private String email;
    private String address;
    private Role role = Role.PATIENT;

}

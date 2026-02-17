package com.service;

import com.dto.LoginRequest;
import com.dto.SignupRequest;
import com.dto.AuthResponse;

public interface UserService {
    AuthResponse registerUser(SignupRequest request);
    AuthResponse loginUser(LoginRequest request);
}

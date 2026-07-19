package com.hvnhuan.identity_service.exception;

public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorize Exception error"),
    INVALID_KEY(1001, "Invalid message key"),
    USER_EXITED(1002, "User exited"),
    USERNAME_INVALID (1003, "Username must be at least 3 character !"),
    INVALID_PASSWORD (1004, "Password must be at least 8 character !"),
    PRODUCT_EXITED(2002, "Product exited!"),
    PRODUCTNAME_INVALID (2003, "Productname must be at least 3 characters"),
    APPOINTMENT_EXITED(3002, "Appointment exited")

    ;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }


    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}

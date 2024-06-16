package com.example.backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Handle CSRF Token mismatch or missing
    @ExceptionHandler(InvalidCsrfTokenException.class)
    public final ResponseEntity<Object> handleInvalidCsrfTokenException(InvalidCsrfTokenException ex, WebRequest request) {
        String bodyOfResponse = "Invalid CSRF Token";
        logException(ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bodyOfResponse);
    }

    // Handle Access Denied exceptions (403 Forbidden)
    @ExceptionHandler(AccessDeniedException.class)
    public final ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        String bodyOfResponse = "Access Denied: You do not have permission to access this resource";
        logException(ex);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(bodyOfResponse);
    }

    // Handle Unsupported Media Type exceptions
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Object> handleMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException ex, WebRequest request) {
        String errorMessage = "Unsupported Media Type: " + ex.getContentType();
        logException(ex);
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(Map.of("message", errorMessage));
    }

    // Handle File Not Found exceptions
    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<String> handleFileNotFoundException(FileNotFoundException ex) {
        String errorMessage = "File Not Found: " + ex.getMessage();
        logException(ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    // Handle IO exceptions
    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(IOException ex) {
        String errorMessage = "Internal Server Error: An error occurred while processing the file.";
        logException(ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }

    // Handle all other exceptions
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        String bodyOfResponse = "An unexpected error occurred";
        logException(ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(bodyOfResponse);
    }

    // Utility method to log exceptions
    private void logException(Exception ex) {
        log.error("Exception handled: {}", ex.getMessage(), ex);
    }
}

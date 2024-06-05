package com.example.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@Controller
public class HomeController {

//    @GetMapping("/")
//    public String unknown(){
//        return "please login";
//    }
//
//    @RequestMapping(value = "/*", method = RequestMethod.GET)
//    public String redirectToRoot() {
//        return "redirect:/";
//    }

    @GetMapping("/home")
    public String home(Model model){
        model.addAttribute("message", "Welcome to the home page!");
        return "home";
    }

    @GetMapping("/user")
    public String getUser(Authentication authentication) {
        // Retrieve the authenticated user's details
        String username = authentication.getName();
        return "Hello, " + username + "!";
    }

//    @GetMapping("/login")
//    public String login(){
//        return "login";
//    }
}

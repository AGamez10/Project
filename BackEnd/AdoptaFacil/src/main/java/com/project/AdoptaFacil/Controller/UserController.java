package com.project.AdoptaFacil.Controller;

import com.project.AdoptaFacil.Models.User;
import com.project.AdoptaFacil.Service.UserService;
import org.apache.catalina.Server;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/User")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService){
        this.userService = userService;

    }
    @PostMapping("/save")
    public ResponseEntity <?> saveUser (@RequestBody User user){
        try{
            userService.userRegister(user);
            return ResponseEntity.ok("usuario registrado");

        } catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }
    @GetMapping("/query")
    public ResponseEntity<?> queryUser(){
        try {
            List<User> userList =userService.listUsers();
            return ResponseEntity.ok().body(userList);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

}

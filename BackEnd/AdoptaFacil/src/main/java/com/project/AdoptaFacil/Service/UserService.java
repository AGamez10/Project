package com.project.AdoptaFacil.Service;

import com.project.AdoptaFacil.Models.User;
import com.project.AdoptaFacil.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService (UserRepository userRepository){
        this.userRepository=userRepository;

    }
    public void userRegister (User user) {
        userRepository.save(user);
    }
    public List <User> listUsers
            (){
       return userRepository.findAll();
    }
}

package com.project.AdoptaFacil.Repository;

import com.project.AdoptaFacil.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User,Integer> {

}

package com.project.AdoptaFacil.Models;

import com.project.AdoptaFacil.Status.UserStatus;
import jakarta.persistence.*; // Asegura que esta importación esté presente

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private int id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    @Temporal(TemporalType.TIMESTAMP)
    private Date registrationDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLogin;

    @Enumerated(EnumType.STRING) // IMPORTANTE: Esto guarda el enum como texto en la BD
    @Column(nullable = false)
    private UserStatus status;
}

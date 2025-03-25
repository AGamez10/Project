package com.project.AdoptaFacil.Models;

import com.project.AdoptaFacil.Status.DocumentType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "adopter")
public class Adopter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adopter")
    private int idAdopter;

    @Column(name = "id_user", nullable = false)
    private int idUser;

    @Enumerated(EnumType.STRING) // Guarda el enum como texto ('ID', 'PASSPORT', 'OTHER')
    @Column(name = "document_type", nullable = false)
    private DocumentType documentType;

    @Column(name = "document_number", nullable = false, unique = true)
    private int documentNumber;

    @Temporal(TemporalType.DATE)
    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    @Column(name = "occupation", length = 100)
    private String occupation;

    @Column(name = "monthly_income", precision = 10, scale = 2, nullable = false)
    private BigDecimal monthlyIncome;

    @Column(name = "validated")
    private boolean validated;
}

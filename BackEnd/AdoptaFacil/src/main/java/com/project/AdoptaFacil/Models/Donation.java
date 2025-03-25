package com.project.AdoptaFacil.Models;

import com.project.AdoptaFacil.Status.DonationType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "donation")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_donation")
    private int idDonation;

    @Column(name = "id_donor", nullable = false)
    private int idDonor;

    @Column(name = "id_shelter", nullable = false)
    private int idShelter;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING) // Guardará 'MONETARY' o 'IN_KIND' en la BD
    @Column(name = "donation_type", nullable = false)
    private DonationType donationType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "donation_date", nullable = false, updatable = false)
    private Date donationDate;

    @Column(name = "donation_description", columnDefinition = "TEXT")
    private String donationDescription;
}

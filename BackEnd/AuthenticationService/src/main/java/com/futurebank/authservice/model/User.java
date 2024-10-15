package com.futurebank.authservice.model;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;
@EntityListeners(AuditingEntityListener.class) // Enable JPA Auditing
@Entity
@Getter
@Setter
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        
})
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "Account type cannot be blank")
    private String accountType;
    
    @Column(unique = true) // Enforce uniqueness at the database level
    private Long accountNumber;
    @NotBlank(message = "Currency type cannot be blank")
    private String currencyType;

    private String prefix;

    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    private String lastName;

    @NotBlank(message = "Phone number cannot be blank")
    private String phoneNumber;

    @NotNull(message = "Date of birth cannot be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dob;

    @NotBlank(message = "Street address cannot be blank")
    private String streetAddress;

    private String streetAddress2;

    @NotBlank(message = "City cannot be blank")
    private String city;

    @NotBlank(message = "State/Province cannot be blank")
    private String stateProvince;

    @NotBlank(message = "Postal/Zip code cannot be blank")
    private String postalZipCode;

    @NotBlank(message = "Aadhaar number cannot be blank")
    private String adhaarNumber;

    @NotBlank(message = "Country cannot be blank")
    private String country;

    private String citizenship;
    private String maritalStatus;
    private String occupation;
    private String employerName;

    @OneToMany(targetEntity = Beneficiary.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private Set<Beneficiary> beneficiaries = new HashSet<>();
     
    @NotBlank(message = "Username cannot be blank")
    private String username;

    // Note: Use Spring Security to encode passwords before setting them
    @NotBlank(message = "Password cannot be blank")
    private String password;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Collection<Role> roles = new HashSet<>();

    @CreatedDate
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP) // Specify the mapping for Date
    private Date createdAt;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP) // Specify the mapping for Date
    private Date updatedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new HashSet<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Implementations for other methods from UserDetails if needed
    // Constructors, Getters, and Setters for the rest of the fields
}

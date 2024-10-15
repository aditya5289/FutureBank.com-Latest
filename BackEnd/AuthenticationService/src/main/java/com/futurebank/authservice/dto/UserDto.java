package com.futurebank.authservice.dto;

import com.futurebank.authservice.model.Role;
import java.util.Collection;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Long userId;
    private String accountType;
    private String currencyType;
    private String prefix;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Date dob; // Assuming you are okay with exposing Date of Birth
    private String streetAddress;
    private String streetAddress2;
    private String city;
    private String stateProvince;
    private String postalZipCode;
    private String adhaarNumber; // Double-check for personal information sensitivity
    private String country;
    private String citizenship;
    private String maritalStatus;
    private String occupation;
    private String employerName;
    private String username;
    private String email;
    private Long accountNumber; // Assuming accountNumber is of type Long in User entity
   

    // Default constructor for JSON deserialization
    public UserDto() {}

    // Constructor with all parameters
    public UserDto(Long userId, String accountType, String currencyType, String prefix, String firstName, String lastName, String phoneNumber, Date dob, String streetAddress, String streetAddress2, String city, String stateProvince, String postalZipCode, String adhaarNumber, String country, String citizenship, String maritalStatus, String occupation, String employerName, String username, String email, Long accountNumber) {
        this.userId = userId;
        this.accountType = accountType;
        this.currencyType = currencyType;
        this.prefix = prefix;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.streetAddress = streetAddress;
        this.streetAddress2 = streetAddress2;
        this.city = city;
        this.stateProvince = stateProvince;
        this.postalZipCode = postalZipCode;
        this.adhaarNumber = adhaarNumber;
        this.country = country;
        this.citizenship = citizenship;
        this.maritalStatus = maritalStatus;
        this.occupation = occupation;
        this.employerName = employerName;
        this.username = username;
        this.email = email;
        this.accountNumber = accountNumber;
     
    }

	@Override
	public String toString() {
		return "UserDto [userId=" + userId + ", accountType=" + accountType + ", currencyType=" + currencyType
				+ ", prefix=" + prefix + ", firstName=" + firstName + ", lastName=" + lastName + ", phoneNumber="
				+ phoneNumber + ", dob=" + dob + ", streetAddress=" + streetAddress + ", streetAddress2="
				+ streetAddress2 + ", city=" + city + ", stateProvince=" + stateProvince + ", postalZipCode="
				+ postalZipCode + ", adhaarNumber=" + adhaarNumber + ", country=" + country + ", citizenship="
				+ citizenship + ", maritalStatus=" + maritalStatus + ", occupation=" + occupation + ", employerName="
				+ employerName + ", username=" + username + ", email=" + email + ", accountNumber=" + accountNumber
				+ "]";
	}

   

    // Consider including methods for handling more complex mappings or transformations if necessary
}

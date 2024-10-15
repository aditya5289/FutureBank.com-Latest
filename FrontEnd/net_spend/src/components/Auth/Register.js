import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  // Initialize form state with default values or those from local storage
  const getInitialFormData = () => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : {
      username: "",
      password: "",
      email: "",
      accountType: "",
      currencyType: "",
      prefix: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dob: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      stateProvince: "",
      postalZipCode: "",
      adhaarNumber: "",
      country: "",
      citizenship: "",
      maritalStatus: "",
      occupation: "",
      employerName: "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    // Cleanup on component unmount
   
  }, [formData]);

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed222");
      }

      alert("Registration successful. Please check your email for verification.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error22:", error);
      alert(error.message || "Registration failed. Please try again222.");
    }
  };

  const handleChange = (e) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedFormData);
  };

  const inputType = (key) => {
    switch (key) {
      case "password": return "password";
      case "phoneNumber":
      case "postalZipCode":
      case "adhaarNumber": return "number";
      case "dob": return "date";
      case "email": return "email";
      default: return "text";
    }
  };

  const formFields = Object.keys(formData);
  const fieldPairs = [];
  for (let i = 0; i < formFields.length; i += 7) {
    fieldPairs.push(formFields.slice(i, i + 7));
  }

  return (
    <div className="registration-form">
      <h2>Future Bank New Account Registration Form</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {fieldPairs.map((pair, index) => (
          <div key={index} className="form-row">
            {pair.map((key) => (
              <div key={key} className="input-group">
                <label htmlFor={key}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .replace(/_/g, " ")}:
                </label>
                <input
                  type={inputType(key)}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
}

export default Register;

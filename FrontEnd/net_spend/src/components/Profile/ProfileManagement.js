import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserEdit, FaKey, FaUsers, FaShieldAlt } from 'react-icons/fa';
import './ProfileManagement.css'; // Make sure to create and import a CSS file for styling

const ProfileManagement = () => {
    const location = useLocation();

    const linkClasses = (path) => {
        return `profile-link ${location.pathname === path ? 'active' : ''}`;
    };

    return (
        <div className="profileManagement">
            <h1>Profile Management</h1>
            <ul>
                <li>
                    <Link to="/profile/personal-details-update" className={linkClasses("/profile/personal-details-update")}>
                        <FaUserEdit /> Update Personal Details
                    </Link>
                </li>
                <li>
                    <Link to="/profile/change-password" className={linkClasses("/profile/change-password")}>
                        <FaKey /> Change Password
                    </Link>
                </li>
                <li>
                    <Link to="/profile/manage-beneficiaries" className={linkClasses("/profile/manage-beneficiaries")}>
                        <FaUsers /> Manage Beneficiaries
                    </Link>
                </li>
                <li>
                    <Link to="/profile/high-security-options" className={linkClasses("/profile/high-security-options")}>
                        <FaShieldAlt /> High Security Options
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileManagement;

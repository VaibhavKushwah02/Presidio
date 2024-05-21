import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'buyer'
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/register', form)
            .then(response => {
                console.log('Registered successfully!', response.data);
            })
            .catch(error => {
                console.error('There was an error registering!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
                <label>Phone Number:</label>
                <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} />
            </div>
            <div>
                <label>Role:</label>
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
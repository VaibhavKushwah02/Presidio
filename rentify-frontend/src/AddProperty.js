import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = ({ token }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        bedrooms: 0,
        bathrooms: 0,
        rent: 0
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/properties', form, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log('Property added!', response.data);
            })
            .catch(error => {
                console.error('There was an error adding the property!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="description" value={form.description} onChange={handleChange} />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" name="location" value={form.location} onChange={handleChange} />
            </div>
            <div>
                <label>Bedrooms:</label>
                <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} />
	        </div>
            <div>
                <label>Bathrooms:</label>
                <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} />
	        </div>
            <div>
                <label>Rent:</label>
                <input type="number" name="rent" value={form.rent} onChange={handleChange} />
	        </div>

            <button type="submit">Add Property</button>
        </form>
);

};

export default AddProperty;



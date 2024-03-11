import React, { useState, useEffect } from 'react';
import './RegistrationScreen.css';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNo: '',
    email: '',
    phoneNumber: '',
    branch: '',
    nssYear: '',
    selectedSlot: ''
  });

  const [slotCounts, setSlotCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  useEffect(() => {
    const fetchSlotCounts = async () => {
      try {
        const response = await axios.get('/api/slotCounts');
        const fetchedSlotCounts = response.data.reduce((acc, curr) => {
          acc[curr.slotNumber] = curr.count;
          console.log(acc);
          return acc;
        }, {});
        setSlotCounts(fetchedSlotCounts);
      } catch (error) {
        console.error('Error fetching slot counts:', error);
      }
    };
  
    fetchSlotCounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { selectedSlot } = formData;
    console.log(selectedSlot);
    console.log(slotCounts[selectedSlot]);

    if (selectedSlot && slotCounts[selectedSlot] >= 20) {
      alert('Sorry, this time slot is full. Please select another slot.');
      return;
    }
  
    try {
      const response = await axios.post('/api/register', formData);
      console.log(response.data.message); 
  
      if (selectedSlot) {
        const updatedSlotCounts = { ...slotCounts };
        updatedSlotCounts[selectedSlot] += 1;
        setSlotCounts(updatedSlotCounts);
      }
      
      window.alert('Registration successful!');
  
      setFormData({
        fullName: '',
        rollNo: '',
        email: '',
        phoneNumber: '',
        branch: '',
        nssYear: '',
        selectedSlot: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='wrapper'>
      <div className='heading'>NSS BLOOD DONATION CAMP: ETAMAX'24</div> 
      <form onSubmit={handleSubmit}>
        <h1>Volunteer Registration</h1>
        <div className='input-box'>
          <input type='text' placeholder='Full Name' name='fullName' value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className='input-box'>
          <input type='text' placeholder='Roll No.' name='rollNo' value={formData.rollNo} onChange={handleChange} pattern="[0-9]{7}" required />
        </div>
        <div className='input-box'>
          <input type='email' placeholder='E-mail' name='email' value={formData.email} onChange={handleChange} required />
        </div>
        <div className='input-box'>
          <input type='tel' placeholder='Phone Number' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} pattern="[0-9]{10}" required />
        </div>
        <div className='dropdown'>
          <select name='branch' value={formData.branch} onChange={handleChange} required>
            <option value=''>Branch</option>
            <option value='Comps'>Computer Engineering</option>
            <option value='EXTC'>EXTC</option>
            <option value='Mech'>Mechanical Engineering</option>
            <option value='IT'>Information Technology</option>
            <option value='Elec'>Electrical Engineering</option>
          </select>
        </div>
        <div className='dropdown'>
          <select name='nssYear' value={formData.nssYear} onChange={handleChange} required>
            <option value=''>NSS year</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
        </div>
        <div className='dropdown'>
          <select name='selectedSlot' value={formData.selectedSlot} onChange={handleChange} required>
            <option value=''>Select Slot</option>
            <option value='1'>8:30am to 5:30pm</option>
            <option value='2'>8:30am to 11:30am</option>
            <option value='3'>11:30am to 2:30pm</option>
            <option value='4'>2:30pm to 5:30pm</option>
          </select>
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;


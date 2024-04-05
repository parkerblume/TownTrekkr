import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TownsList = () => {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const example = [
    {
      _id: "1",
      name: "Example-ville",
      description: "A fake town with fake people and a fake name.",
      creatingUsername: "Example_User_10",
      topLeftLat: 0.0,
      topLeftLong: 1.0,
      botRightLat: -1.0,
      botRightLong: 2.0,
      scoreMod: 1,
      townMembers: [{ userId: "user1", _id: "member1" }],
    },
    {
      _id: "1",
      name: "Fake Town",
      description: "We're way faker than that other one!",
      creatingUsername: "Example_User_11",
      topLeftLat: 0.1,
      topLeftLong: 1.1,
      botRightLat: -1.1,
      botRightLong: 2.1,
      scoreMod: 1,
      townMembers: [{ userId: "user1", _id: "member1" }],
    }
  ];

  const fetchTowns = async () => {
    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.id) {
        throw new Error('User not found in localStorage.');
      }
      const response = await fetch(`https://www.towntrekkr.com/api/town/gettowns?userId=${storedUser.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length > 0) {
        setTowns(data);
      } else {
        setTowns(example);
      }
    } catch (error) {
      console.error('Failed to fetch towns:', error);
      setTowns(example);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTowns();
  }, []);

  return (
    <div style={{
      background: '#ABC4AB',
      padding: '20px',
      height: '60vh',
      width: '35vw',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#A39171 #ABC4AB',
    }}>
      <button 
        onClick={fetchTowns} 
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#DCC9B6',
          margin: '10px',
          borderRadius: '5px',
        }}>
          {isLoading ? 'Loading...' : 'Refresh Towns'}
      </button>
      {towns.map(town => (
        <div 
          key={town._id} 
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#A39171',
            borderRadius: '10px',
            padding: '15px',
            minWidth: '500px',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>{town.name}</h2>
            <p style={{ fontSize: '24px' }}>Created by: {town.creatingUsername}</p>
            <p style={{ fontStyle: 'italic', fontSize: '20px' }}>{town.description}</p>
            <p style={{ fontSize: '18px' }}>Coordinates: [{town.topLeftLat}, {town.topLeftLong}] to [{town.botRightLat}, {town.botRightLong}]</p>
          </div>
          <button 
            onClick={() => navigate('/GuessPage')}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              backgroundColor: '#DCC9B6',
              borderRadius: '5px',
              marginLeft: '20px',
              height: '100px',
            }}>
              Play
          </button>
        </div>
      ))}
    </div>
  );
};

export default TownsList;

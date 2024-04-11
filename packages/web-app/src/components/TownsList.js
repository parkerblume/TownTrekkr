import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/commonStyles';

const example = [
  // {
  //   _id: "1",
  //   name: "Example-ville",
  //   description: "A fake town with fake people and a fake name.",
  //   creatingUsername: "Example_User_10",
  //   topLeftLat: 0.0,
  //   topLeftLong: 1.0,
  //   botRightLat: -1.0,
  //   botRightLong: 2.0,
  //   scoreMod: 1,
  //   townMembers: [{ userId: "user1", _id: "member1" }],
  // },
  // {
  //   _id: "2",
  //   name: "Fake Town",
  //   description: "We're way faker than that other one!",
  //   creatingUsername: "Example_User_11",
  //   topLeftLat: 0.1,
  //   topLeftLong: 1.1,
  //   botRightLat: -1.1,
  //   botRightLong: 2.1,
  //   scoreMod: 1,
  //   townMembers: [{ userId: "user1", _id: "member1" }],
  // }
];

const TownsList = () => {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const localStorageExampleData = {
		"_id": "660eed19f9eadf4267c40a18",
		"fileId": "660eed19a00c8514f2d09c94",
		"user_id": "66060766d2f84a45fe9c98be",
		"town": "660497f815daa8e29584bed5",
		"coordinateX": 28.65944913314387,
		"coordinateY": -81.2053436789252,
		"likes": 0,
		"dislikes": 0,
		"createdAt": "2024-04-04T18:10:33.961Z",
		"updatedAt": "2024-04-04T18:10:33.961Z",
		"__v": 0
	}
	localStorage.setItem('imageData', JSON.stringify(localStorageExampleData));
  const navigate = useNavigate();

  const deleteTown = async (townId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.id) {
      alert('You are not logged in.');
      return;
    }

    const response = await fetch(`/api/town/gettown`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ townId }),
    });

    if (!response.ok) {
      alert('Failed to verify town ownership.');
      return;
    }

    const townData = await response.json();

    if (townData.creatingUsername !== storedUser.name) {
      console.log(townData.creatingUsername);
      console.log(storedUser.name);
      alert('You are not the owner of this town.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this town?')) {
      const deleteResponse = await fetch(`/api/town/deletetown`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ town_id: townId }),
      });

      if (!deleteResponse.ok) {
        alert('Failed to delete town.');
        return;
      }

      alert('Town deleted successfully.');
      fetchTowns();
    }
  };

  const fetchTowns = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log(storedUser);
      console.log(storedUser.email);
      if (!storedUser || !storedUser.id) {
        throw new Error('User not found in localStorage.');
      }
      const response = await fetch(`/api/town/gettowns?userId=${storedUser.id}`);
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
  }, []);

  useEffect(() => {
    fetchTowns();
  }, [fetchTowns]);

  const handleTownSelect = (town) => {
    localStorage.setItem('selectedTown', JSON.stringify(town));
    navigate('/GuessPage');
  };

  return (
    <div style={{ background: '#ABC4AB', padding: '20px', height: '60vh', width: '30vw', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#A39171 #ABC4AB' }}>
      <h2 style={{ fontSize: '36px', color: colors.buttonPrimary, textAlign: 'center' }}>My Towns</h2>
      <button onClick={fetchTowns} disabled={isLoading} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#DCC9B6', margin: '10px', borderRadius: '5px' }}>
        {isLoading ? 'Loading...' : 'Refresh'}
      </button>
      {towns.map(town => (
        <div key={town._id} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#A39171', borderRadius: '10px', padding: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>{town.name}</h2>
            <p style={{ fontSize: '24px' }}>Created by: {town.creatingUsername}</p>
            <p style={{ fontStyle: 'italic', fontSize: '20px' }}>{town.description}</p>
            {/* <p style={{ fontSize: '18px' }}>Coordinates: [{town.topLeftLat}, {town.topLeftLong}] to [{town.botRightLat}, {town.botRightLong}]</p> */}
          </div>
          <div>
            <button onClick={() => handleTownSelect(town)} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#DCC9B6', borderRadius: '5px', marginRight: '5px' }}>
              Play
            </button>
            <button onClick={() => deleteTown(town._id)} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#D95A5A', borderRadius: '5px' }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TownsList;

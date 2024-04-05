import React, { useState, useEffect } from 'react';

const TownsList = () => {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTowns = async () => {
    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        alert('No user found in localStorage.');
        setIsLoading(false);
        return;
      }
      if (!storedUser.id) {
        alert('User ID not found.');
        setIsLoading(false);
        return;
      }
      const response = await fetch(`https://www.towntrekkr.com/api/town/gettowns?userId=${storedUser.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setTowns(data);
    } catch (error) {
      console.error('Failed to fetch towns:', error);
      alert('Failed to fetch towns. Please try again.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTowns();
  }, []);

  return (
    <div>
      <button onClick={fetchTowns} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Refresh Towns'}
      </button>
      {towns.length > 0 ? (
        <ul>
          {towns.map(town => (
            <li key={town._id}>
              Name: {town.name}, Description: {town.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No towns found.</p>
      )}
    </div>
  );
};

export default TownsList;

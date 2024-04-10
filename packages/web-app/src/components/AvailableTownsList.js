import React, { useState, useCallback } from 'react';
import { colors } from '../styles/commonStyles';

const AvailableTownsList = () => {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTowns = useCallback(async (requestedPage) => {
    if (!hasMore && requestedPage !== 1) return;

    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.id) {
        throw new Error('User not found in localStorage.');
      }
      const response = await fetch(`https://www.towntrekkr.com/api/town/gettowns?userId=${storedUser.id}&page=${requestedPage}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newTowns = await response.json();
      if (requestedPage === 1) {
        setTowns(newTowns);
      } else {
        setTowns(prevTowns => [...prevTowns, ...newTowns]);
      }
      setHasMore(newTowns.length > 0);
      setPage(requestedPage + 1);
    } catch (error) {
      console.error('Failed to fetch towns:', error);
    }
    setIsLoading(false);
  }, [hasMore]);

  const refreshTowns = () => {
    setTowns([]);
    setPage(1);
    setHasMore(true);
    fetchTowns(1);
  };

  const joinTown = async (townId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.id) {
      alert('You are not logged in.');
      return;
    }

    try {
      const response = await fetch(`/api/town/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ town_id: townId, user_id: storedUser.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to join the town.');
      }

      alert('You have successfully joined the town.');
      fetchTowns();
    } catch (error) {
      console.error('Failed to join the town:', error);
      alert('Failed to join the town. Please try again.');
    }
  };

  const loadMoreTowns = () => {
    if (!isLoading && hasMore) {
      fetchTowns(page);
    }
  };

  return (
    <div style={{ background: '#ABC4AB', padding: '20px', height: '60vh', width: '30vw', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#A39171 #ABC4AB' }}>
      <h2 style={{ fontSize: '36px', color: colors.buttonPrimary, textAlign: 'center' }}>All Towns</h2>
      <button onClick={refreshTowns} disabled={isLoading} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#DCC9B6', margin: '10px', borderRadius: '5px' }}>
        {isLoading ? 'Loading...' : 'Refresh'}
      </button>
      {towns.map(town => (
        <div key={town._id} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#A39171', borderRadius: '10px', padding: '15px', minWidth: '500px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>{town.name}</h2>
            <p style={{ fontSize: '24px' }}>Created by: {town.creatingUsername}</p>
            <p style={{ fontStyle: 'italic', fontSize: '20px' }}>{town.description}</p>
            <p style={{ fontSize: '18px' }}>Coordinates: [{town.topLeftLat}, {town.topLeftLong}] to [{town.botRightLat}, {town.botRightLong}]</p>
          </div>
          <button onClick={() => joinTown(town._id)} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#ABC4AB', borderRadius: '5px', color: 'white' }}>
            Join
          </button>
        </div>
      ))}
      {hasMore && (
        <button onClick={loadMoreTowns} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default AvailableTownsList;

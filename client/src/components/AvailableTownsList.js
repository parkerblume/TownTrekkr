import React, { useState, useEffect, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { colors } from '../styles/commonStyles';
import { SERVER } from '../config/config.js';

const AvailableTownsList = () => {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [joinTooltip, setJoinTooltip] = useState({ show: false, message: '', townId: null });

  const fetchTowns = useCallback(async (requestedPage) => {
    if (!hasMore && requestedPage !== 1) return;

    setIsLoading(true);
    try {
      const url = `${SERVER}/api/town/gettowns?page=${requestedPage}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Network response was not ok');
        setIsLoading(false);
        return;
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
  }, [hasMore, setPage, setIsLoading]);

  useEffect(() => {
    fetchTowns(page);
  }, [fetchTowns, page]);

  const refreshTowns = () => {
    setTowns([]);
    setPage(1);
    setHasMore(true);
    fetchTowns(1);
  };

  const joinTown = async (townId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.id) {
      setJoinTooltip({ show: true, message: 'You are not logged in.', townId });
      setTimeout(() => setJoinTooltip({ show: false, message: '', townId: null }), 3000);
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
        setJoinTooltip({ show: true, message: 'Failed to join the town.', townId });
        setTimeout(() => setJoinTooltip({ show: false, message: '', townId: null }), 3000);
        return;
      }

      setJoinTooltip({ show: true, message: 'You have successfully joined the town.', townId });
      setTimeout(() => setJoinTooltip({ show: false, message: '', townId: null }), 3000);
      fetchTowns();
    } catch (error) {
      console.error('Failed to join the town:', error);
      setJoinTooltip({ show: true, message: 'Failed to join the town. Please try again.', townId });
      setTimeout(() => setJoinTooltip({ show: false, message: '', townId: null }), 3000);
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
        <div key={town._id} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#A39171', borderRadius: '10px', padding: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>{town.name}</h2>
            <p style={{ fontSize: '24px' }}>Created by: {town.creatingUsername}</p>
            <p style={{ fontStyle: 'italic', fontSize: '20px' }}>{town.description}</p>
          </div>
          <Tooltip title={joinTooltip.message} open={joinTooltip.show && joinTooltip.townId === town._id} placement="top">
            <button onClick={() => joinTown(town._id)} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#ABC4AB', borderRadius: '5px', color: 'white' }}>
              Join
            </button>
          </Tooltip>
        </div>
      ))}
      {hasMore && (
        <button onClick={loadMoreTowns} disabled={isLoading} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#DCC9B6', borderRadius: '5px' }}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default AvailableTownsList;

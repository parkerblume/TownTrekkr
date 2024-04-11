import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { colors } from '../styles/commonStyles';

const TownsList = () => {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTooltip, setDeleteTooltip] = useState({ show: false, message: '', townId: null });
  const navigate = useNavigate();

  const fetchTowns = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.id) {
        console.error('User not found in localStorage.');
        setIsLoading(false);
        return;
      }
      const response = await fetch(`/api/town/gettowns?userId=${storedUser.id}`);
      if (!response.ok) {
        console.error('Network response was not ok');
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setTowns(data.length > 0 ? data : []);
    } catch (error) {
      console.error('Failed to fetch towns:', error);
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

  const deleteTown = async (townId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.id) {
      setDeleteTooltip({ show: true, message: 'You are not logged in.', townId });
      setTimeout(() => setDeleteTooltip({ show: false, message: '', townId: null }), 3000);
      return;
    }

    const response = await fetch(`/api/town/gettown`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ townId }),
    });

    if (!response.ok) {
      setDeleteTooltip({ show: true, message: 'Failed to verify town ownership.', townId });
      setTimeout(() => setDeleteTooltip({ show: false, message: '', townId: null }), 3000);
      return;
    }

    const townData = await response.json();
    if (townData.creatingUsername !== storedUser.name) {
      setDeleteTooltip({ show: true, message: 'You are not the owner of this town.', townId });
      setTimeout(() => setDeleteTooltip({ show: false, message: '', townId: null }), 3000);
      return;
    }

    if (window.confirm('Are you sure you want to delete this town?')) {
      const deleteResponse = await fetch(`/api/town/deletetown`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ town_id: townId }),
      });
      console.log(townId);
      if (!deleteResponse.ok) {
        setDeleteTooltip({ show: true, message: 'Failed to delete town.', townId });
        setTimeout(() => setDeleteTooltip({ show: false, message: '', townId: null }), 3000);
        return;
      }

      setDeleteTooltip({ show: true, message: 'Town deleted successfully.', townId });
      setTimeout(() => setDeleteTooltip({ show: false, message: '', townId: null }), 3000);
      fetchTowns();
    }
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
          </div>
          <div>
            <button onClick={() => handleTownSelect(town)} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#DCC9B6', borderRadius: '5px', marginRight: '5px' }}>
              Play
            </button>
            <Tooltip title={deleteTooltip.message} open={deleteTooltip.show && deleteTooltip.townId === town._id} placement="top">
              <button onClick={() => deleteTown(town._id)} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#D95A5A', borderRadius: '5px' }}>
                Delete
              </button>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TownsList;

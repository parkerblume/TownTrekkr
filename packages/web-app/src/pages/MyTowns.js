import React from 'react';
import { useNavigate } from 'react-router-dom';
import TownsList from '../components/TownsList';

const MyTowns = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/CreateTownPage');
  };

  return (
    <div className="bg-webPrimary w-screen p-4">
      <div className="flex justify-between">
        <button
          onClick={handleNavigate}
          className="px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded">
          Create Town
        </button>
        <h1 className="text-4xl font-bold">My Towns</h1>
      </div>
      <div className="flex mt-4">
        <div className="flex-1">
          <TownsList />
        </div>
        <div className="flex-1">
        </div>
      </div>
    </div>
  );
};

export default MyTowns;

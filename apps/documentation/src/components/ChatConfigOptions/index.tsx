'use client';

import { useEffect, useState } from 'react';

import { ChatScript } from '../ChatScript';

export const ChatConfigOptions = () => {
  const [projectID, setProjectID] = useState<string>('');

  useEffect(() => {
    const storedProjectID = localStorage.getItem('projectID') || '';
    setProjectID(storedProjectID);
  }, []);

  const handleSave = () => {
    localStorage.setItem('projectID', projectID);
    window.location.reload();
  };

  return (
    <div>
      <input type="text" value={projectID} placeholder="ProjectID" onChange={(e) => setProjectID(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <ChatScript projectID={projectID} />
    </div>
  );
};

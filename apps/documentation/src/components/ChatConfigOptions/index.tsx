import { useEffect, useState } from 'react';

export const ChatConfigOptions = () => {
  const [projectID, setProjectID] = useState<string>('');

  useEffect(() => {
    const storedProjectID = localStorage.getItem('projectID') || '';
    setProjectID(storedProjectID);
  }, []);

  const handleSave = () => {
    localStorage.setItem('projectID', projectID);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <label>ProjectID</label>
      <input type="text" value={projectID} placeholder="ProjectID" onChange={(e) => setProjectID(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

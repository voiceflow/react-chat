import { useState } from 'react';

export const ChatConfigOptions = () => {
  const [projectID, setProjectID] = useState<string>('');

  return (
    <div>
      <input type="text" value={projectID} placeholder="ProjectID" onChange={(e) => setProjectID(e.target.value)} />
    </div>
  );
};

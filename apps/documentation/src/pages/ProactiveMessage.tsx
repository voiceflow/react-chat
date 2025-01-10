import { useState } from 'react';

const inputStyle = {
  border: 'solid 1px black',
  borderRadius: '4px',
  padding: '2px',
};

export const sendButtonStyle = {
  background: '#e8e8e8',
  borderRadius: '4px',
  padding: '4px 8px',
  marginLeft: '4px',
};

export default function ProactiveMessage() {
  const [message, setMessage] = useState('');

  const send = () => {
    (window as any).voiceflow.chat.proactive.push({ type: 'text', payload: { message } });
    setMessage('');
  };

  return (
    <div>
      Add proactive message:
      <input type="text" style={inputStyle} value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="button" style={sendButtonStyle} onClick={send}>
        Send
      </button>
    </div>
  );
}

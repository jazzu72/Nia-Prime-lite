import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply('');

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      setReply(data.reply || 'No response from Nia.');
    } catch (err) {
      setReply('Connection error. Is the backend running?');
    }

    setLoading(false);
    setMessage('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0a', 
      color: '#e0e0e0', 
      fontFamily: 'system-ui, sans-serif',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#ffd700', textAlign: 'center' }}>Nia LeSane</h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#aaa' }}>House of Jazzu — speak your heart</p>

      <div style={{ flex: 1, margin: '20px 0' }}>
        {reply && (
          <div style={{ 
            background: '#1f1f1f', 
            padding: '16px', 
            borderRadius: '12px', 
            marginBottom: '20px',
            borderLeft: '4px solid #ffd700'
          }}>
            <strong>Nia:</strong> {reply}
          </div>
        )}
      </div>

      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Speak to Nia..."
          style={{
            width: '100%',
            height: '120px',
            background: '#1a1a1a',
            border: '1px solid #444',
            borderRadius: '12px',
            padding: '14px',
            color: '#fff',
            fontSize: '16px'
          }}
        />
        <button 
          onClick={sendMessage} 
          disabled={loading}
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '16px',
            background: '#ffd700',
            color: '#000',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >
          {loading ? 'Nia is thinking...' : 'Send Message'}
        </button>
      </div>
    </div>
  );
}

export default App;

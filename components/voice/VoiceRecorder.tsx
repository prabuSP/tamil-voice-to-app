'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function VoiceRecorder() {
  const router = useRouter();
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'ta-IN';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript + ' ';
      }
      setTranscript(text.trim());
    };

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const startRecording = () => recognitionRef.current?.start();
  const stopRecording = () => recognitionRef.current?.stop();

 const analyzeTranscript = async () => {
  if (!transcript.trim()) {
    alert('Please speak in Tamil first');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript }),
    });

    const data = await res.json();

    const encoded = encodeURIComponent(JSON.stringify(data.spec));
    router.push(`/preview?spec=${encoded}`);
  } catch (error) {
    console.error(error);
    alert('Analysis failed');
  } finally {
    setLoading(false);
  }
};

return (
  <div style={{ display: 'grid', gap: 20 }}>
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      <button
        onClick={startRecording}
        disabled={listening}
        style={{
          padding: '14px 22px',
          borderRadius: 14,
          border: 'none',
          background: listening
            ? '#7C3AED'
            : 'linear-gradient(90deg, #2563EB, #7C3AED)',
          color: 'white',
          fontWeight: 700,
          fontSize: 15,
          cursor: listening ? 'not-allowed' : 'pointer',
          boxShadow: '0 10px 30px rgba(37,99,235,0.35)',
          transition: 'all 0.2s ease',
        }}
      >
        🎤 {listening ? 'Listening...' : 'Start Recording'}
      </button>

      <button
        onClick={stopRecording}
        style={{
          padding: '14px 22px',
          borderRadius: 14,
          border: '1px solid #2A3350',
          background: '#151B2E',
          color: '#E5E7EB',
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        ⏹ Stop
      </button>

      <button
        onClick={analyzeTranscript}
        disabled={loading}
        style={{
          padding: '14px 24px',
          borderRadius: 14,
          border: 'none',
          background: loading
            ? '#334155'
            : 'linear-gradient(90deg, #059669, #10B981)',
          color: 'white',
          fontWeight: 700,
          fontSize: 15,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 10px 30px rgba(5,150,105,0.35)',
          transition: 'all 0.2s ease',
        }}
      >
        {loading ? 'Generating...' : 'Analyze & Generate App'}
      </button>
    </div>

    <div
      style={{
        background: '#0F1425',
        border: '1px solid #20263A',
        borderRadius: 18,
        padding: 18,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <span
          style={{
            color: '#E5E7EB',
            fontWeight: 600,
          }}
        >
          Tamil transcript
        </span>

        <span
          style={{
            color: listening ? '#22C55E' : '#64748B',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {listening ? '● Recording' : 'Ready'}
        </span>
      </div>

      <textarea
        rows={8}
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="தமிழில் பேசுங்கள்... உதாரணம்: ஒரு grocery billing app வேண்டும்"
        style={{
          width: '100%',
          background: '#11162A',
          color: '#F8FAFC',
          border: '1px solid #2A3350',
          borderRadius: 14,
          padding: 16,
          fontSize: 16,
          lineHeight: 1.6,
          resize: 'vertical',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
        }}
      >
        <span
          style={{
            color: '#64748B',
            fontSize: 13,
          }}
        >
          AI will generate a complete web application from your Tamil voice input.
        </span>

        <span
          style={{
            color: '#64748B',
            fontSize: 13,
          }}
        >
          {transcript.length} characters
        </span>
      </div>
    </div>
  </div>
);
}
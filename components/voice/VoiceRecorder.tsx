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
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={startRecording} disabled={listening}>
          🎤 {listening ? 'Listening...' : 'Start Recording'}
        </button>

        <button onClick={stopRecording}>
          ⏹ Stop
        </button>

        <button onClick={analyzeTranscript} disabled={loading}>
          {loading ? 'Generating...' : 'Analyze & Generate App'}
        </button>
      </div>

      <textarea
        rows={6}
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="தமிழில் பேசுங்கள்..."
      />
    </div>
  );
}
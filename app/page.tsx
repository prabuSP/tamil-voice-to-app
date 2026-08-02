'use client';

import VoiceRecorder from '../components/voice/VoiceRecorder';

export default function Home() {
return (
<main
style={{
minHeight: '100vh',
background: 'linear-gradient(135deg, #0B1020 0%, #11162A 100%)',
color: 'white',
padding: '40px 24px',
}}
>
<div
style={{
maxWidth: 1200,
margin: '0 auto',
}}
>
{/* Header */}
<div
style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 48,
}}
> <div>
<h1
style={{
fontSize: 42,
fontWeight: 800,
margin: 0,
letterSpacing: '-0.02em',
}}
>
KuralApp </h1>
<p
style={{
color: '#A7B0C0',
marginTop: 8,
fontSize: 16,
}}
>
Voice-to-App Builder in Tamil </p> </div>


      <button
        style={{
          padding: '12px 18px',
          borderRadius: 14,
          border: '1px solid #2A3350',
          background: '#151B2E',
          color: 'white',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Deploy
      </button>
    </div>

    {/* Hero */}
    <div
      style={{
        textAlign: 'center',
        marginBottom: 48,
      }}
    >
      <h2
        style={{
          fontSize: 48,
          fontWeight: 800,
          marginBottom: 16,
          lineHeight: 1.1,
        }}
      >
        Build apps by speaking in Tamil
      </h2>

      <p
        style={{
          color: '#A7B0C0',
          fontSize: 20,
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
        Describe your business in Tamil. AI will generate a working web
        application with dashboard, CRUD operations, reports, and a live
        preview.
      </p>
    </div>

    {/* Main Grid */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: 24,
      }}
    >
      {/* Voice Panel */}
      <div
        style={{
          background: '#11162A',
          border: '1px solid #20263A',
          borderRadius: 24,
          padding: 28,
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <h3
            style={{
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Tamil voice input
          </h3>

          <p style={{ color: '#A7B0C0' }}>
            Click the microphone and describe the application you want to
            build in Tamil.
          </p>
        </div>

        <VoiceRecorder />
      </div>

      {/* AI Status Panel */}
      <div
        style={{
          display: 'grid',
          gap: 20,
        }}
      >
        <div
          style={{
            background: '#11162A',
            border: '1px solid #20263A',
            borderRadius: 24,
            padding: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#22C55E',
              }}
            />

            <span style={{ fontWeight: 600 }}>AI Status</span>
          </div>

          <p style={{ color: '#A7B0C0' }}>
            Ready to generate applications from Tamil voice input.
          </p>
        </div>

        <div
          style={{
            background: '#11162A',
            border: '1px solid #20263A',
            borderRadius: 24,
            padding: 24,
          }}
        >
          <h4
            style={{
              marginBottom: 16,
              fontSize: 18,
            }}
          >
            Example prompts
          </h4>

          <div style={{ display: 'grid', gap: 12 }}>
            {[
              'ஒரு grocery billing app வேண்டும்',
              'ஒரு tuition center management app வேண்டும்',
              'ஒரு textile inventory app வேண்டும்',
            ].map((prompt) => (
              <div
                key={prompt}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  background: '#0F1425',
                  border: '1px solid #20263A',
                  color: '#E5E7EB',
                }}
              >
                {prompt}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: '#11162A',
            border: '1px solid #20263A',
            borderRadius: 24,
            padding: 24,
          }}
        >
          <h4
            style={{
              marginBottom: 16,
              fontSize: 18,
            }}
          >
            What AI will generate
          </h4>

          <ul
            style={{
              color: '#A7B0C0',
              lineHeight: 1.8,
              paddingLeft: 18,
            }}
          >
            <li>Dashboard</li>
            <li>Customer management</li>
            <li>Billing system</li>
            <li>Reports</li>
            <li>Export</li>
            <li>Live preview</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</main>

);
}

import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  // Function to generate TTS for selected text
  const generateSpeech = async (selectedText) => {
    if (!selectedText.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/jqcCZkN6Knx8BJ5TBdYR?output_format=mp3_44100_128",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": "sk_c58cfc071946b5938029a8f05e24845b37f7716b6993fbe9",
          },
          body: JSON.stringify({
            text: selectedText,
            model_id: "eleven_multilingual_v2",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error("Error generating speech:", err);
    }

    setLoading(false);
  };

  // Detect text selection in the textarea
  useEffect(() => {
    const textarea = document.querySelector("textarea");

    const handleSelection = () => {
      const selectedText = textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
      );
      if (selectedText.trim()) {
        // Stop previous audio if playing
        audioRef.current?.pause();
        audioRef.current.currentTime = 0;
        generateSpeech(selectedText);
      }
    };

    textarea.addEventListener("mouseup", handleSelection);
    textarea.addEventListener("keyup", handleSelection);

    return () => {
      textarea.removeEventListener("mouseup", handleSelection);
      textarea.removeEventListener("keyup", handleSelection);
    };
  }, []);

  // Play audio automatically when URL updates
  useEffect(() => {
    if (audioUrl) {
      audioRef.current.play();
    }
  }, [audioUrl]);

  // 🎵 Controls
  const playAudio = () => {
    audioRef.current?.play();
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  const rewindAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0);
    }
  };

  const forwardAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 5,
        audioRef.current.duration
      );
    }
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">🎙️ ElevenLabs TTS Demo</h1>

      {/* Input Field */}
      <textarea
        className="w-[400px] p-3 rounded-lg bg-[#1A1A1A] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
        rows={6}
        placeholder="Type something and select text to hear it..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Audio Player with Custom Controls */}
      {audioUrl && (
        <div className="mt-6 flex flex-col items-center">
          <audio ref={audioRef} src={audioUrl} />

          <div className="flex gap-4 mt-4">
            <button
              onClick={rewindAudio}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              ⏪ -5s
            </button>
            <button
              onClick={playAudio}
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
            >
              ▶️ Play
            </button>
            <button
              onClick={pauseAudio}
              className="px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700"
            >
              ⏸ Pause
            </button>
            <button
              onClick={forwardAudio}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              ⏩ +5s
            </button>
          </div>
        </div>
      )}

      {loading && <p className="mt-4 text-pink-500">Generating speech...</p>}
    </div>
  );
}

export default App;

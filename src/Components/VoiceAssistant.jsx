import { useState, useEffect, useRef } from 'react';

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');


  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setMessage(transcript);
      handleCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Error:', event.error);
      if (event.error === 'no-speech') {
        speak('I did not hear anything. Please try again.');
      }
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start();   // auto-restart
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    setListening(true);
    recognitionRef.current.start();
    speak('I am listening...');
  };

  const stopListening = () => {
    setListening(false);
    recognitionRef.current.stop();
    speak('Stopped listening.');
  };

  const handleCommand = (text) => {
    let reply = '';
    const lowerText = text.toLowerCase();


    if(lowerText.includes('hey assistant') || lowerText.includes('hey jarvis')){
      reply = 'Hi! This is Jarvis speaking... Say how can i help you';
    }

    else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      reply = 'Hello! How can I help you?';
    }

    else if (lowerText.includes('namaste')) {
      reply = 'Namaskaram! Nenu miku ela sahayam ceyagalanu?... Sorry I am still working on my telugu accent'
    }

    else if (lowerText.includes('time')) {
      reply = `The time is ${new Date().toLocaleTimeString()}`;
    }

    else if (lowerText.includes('open youtube')) {
      reply = 'Opening YouTube.';
      window.open('https://www.youtube.com', '_blank');
    }

    else if (lowerText.includes('open facebook')) {
      reply = 'Opening Facebook.';
      window.open('https://www.facebook.com', '_blank');
    }

    else if (lowerText.includes('open instagram')) {
      reply = 'Opening Instagram.';
      window.open('https://www.instagram.com', '_blank');
    }

    else if (lowerText.includes('open whatsapp')) {
      reply = 'Opening Whatsapp.';
      window.open('https://www.whatsapp.com', '_blank');
    }

    else if (lowerText.includes('open google')) {
      reply = 'Opening Google.';
      window.open('https://www.google.com', '_blank');
    }

    else if (lowerText.startsWith('search')) {
      const query = lowerText.replace('search', '').trim();
      if (query) {
        reply = `Searching for ${query} on Google.`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      } else {
        reply = 'What should I search for?';
      }
    }

    else if (lowerText.includes('play music')) {
      const SongName = lowerText.replace('play music', '').trim();
      if (SongName) {
        reply = `Playing ${SongName} on Spotify.`;
        window.open(`https://open.spotify.com/search/${encodeURIComponent(SongName)}`, '_blank');
      } else {
        reply = 'Plz say the song name after "play music".';
      }
    }

    setResponse(reply);
    speak(reply);
  };


  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.cancel();         //To cancel the prev speak/queued speak, before starting a new one.
    speechSynthesis.speak(utterance);
  };


  return (

    <div className="flex justify-center mt-14">

      <form className="md:w-1/2 w-[90vw] flex flex-col gap-2 md:gap-0 md:flex-row justify-between border-2 rounded-md md:p-4 p-2" onSubmit={(e) => e.preventDefault()}>
        <div className='flex-col'>
          <p className="break-words"><strong>You said:</strong> {message}</p>
          <p className="break-words"><strong>Response:</strong> {response}</p>
        </div>
        <button
          type='button'
          className=" text-white border-2 border-[#400c44] rounded-2xl md:p-2 p-1  bg-[#6a0771] dark:bg-[#500d55] opacity-90 ring-1 focus:ring-white dark:focus:ring-pink-950"
          onClick={listening ? stopListening : startListening}
        >
          {listening ? 'Stop Listening...' : 'Start Listening'}
        </button>
      </form>

    </div>

  );
};

export default VoiceAssistant;

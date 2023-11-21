import React, { useEffect, useState } from "react";

function Chrono() {
  const [seconde, setSeconde] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    function tick() {
      setSeconde((prevSeconde) => prevSeconde + 1);
    }

    if (running) {
      tick();
      const id = setInterval(tick, 1000);
      setIntervalId(id);

      return () => {
        clearInterval(id);
      };
    }
  }, [running]);

  function stop() {
    clearInterval(intervalId);
    setRunning(false);
  }

  function start() {
    setRunning(true);
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">Chronomètre</h1>
      <div className="max-w-md p-8 bg-gray-700 rounded-md text-center">
        <h1 className="text-6xl font-bold mb-6">{formatTime(seconde)}</h1>
        {seconde === 0 ? (
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            onClick={start}
          >
            Commencer
          </button>
        ) : (
          <button
            className={`${
              running ? "bg-red-500" : "bg-blue-500"
            } text-white px-6 py-3 rounded-md hover:bg-opacity-75 focus:outline-none focus:ring`}
            onClick={running ? stop : start}
          >
            {running ? "Stop" : "Reprendre"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Chrono;

import { useState, useEffect} from "react";
import "./App.css";
function App(){
  const [totalPoints, setTotalPoints] = useState(5);
  const [points, setPoints] = useState([]);
  const [current, setCurrent] = useState(1);
  const [gameOver, setGameOver]=useState(false);
  const[time,setTime]= useState(0);
  const[autoplay, setAutoPlay]= useState(false);
  const[isPlaying, setIsPlaying]= useState(false);  
  const createPoints = (num) =>{
    return Array.from({ length: num},(_,i)=> ({
      id:i+1,
      visible: true,
      top: Math.random() * 80,
      left: Math.random() * 80,

    }));
  };
  const startGame = () =>{
    setPoints(createPoints(totalPoints));
    setCurrent(1);
    setGameOver(false);
    setTime(0);
    setIsPlaying(true);
  };
  const allCleared = points.length > 0 && points.every(p => !p.visible);
useEffect(() => {
  if(!isPlaying ||gameOver || allCleared) return;
  const interval = setInterval(() => {
    setTime((t)=>t+0.1);
  },100);
  return () => clearInterval(interval);
}, [isPlaying,gameOver, allCleared]);
  const handleClick =(id) =>{
    if(gameOver) return;
    const point = points.find((p) => p.id === id);
    if(!point.visible) return;
    if(id === current){
      setPoints((prev) =>
        prev.map((p)=>
        p.id === id? {...p, visible: false} : p
        )
      );
      setCurrent((c) =>c+1);
    } else{
      setGameOver(true);
    }
    };
    useEffect(() => {
      if(!autoplay || gameOver) return;
      if(current > totalPoints) return;
      const timeout = setTimeout(() =>{
        handleClick(current);
      },500);
      return() =>clearTimeout(timeout);
    }, [autoplay, current, gameOver, allCleared]);
      return (
    <div className="container">
      <h2 style={{ color: "red" }}>
        {gameOver ? "GAME OVER" : allCleared ? "ALL CLEARED" : "PLAYING"}
      </h2>

      <div>
        Points:{" "}
        <input
          type="number"
          value={totalPoints}
          onChange={(e) => setTotalPoints(Number(e.target.value))}
        />
      </div>

      <div>Time: {time.toFixed(1)}s</div>

      <button onClick={startGame}>Restart</button>
      <button onClick={() => setAutoPlay(!autoplay)}>
        {autoplay ? "Stop Auto" : "Auto Play"}
      </button>

      <div className="board">
        {points.map(
          (p) =>
            p.visible && (
              <div
                key={p.id}
                className="point"
                style={{
                  top: p.top + "%",
                  left: p.left + "%",
                }}
                onClick={() => handleClick(p.id)}
              >
                {p.id}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default App;
  

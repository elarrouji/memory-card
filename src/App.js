import React, { useState, useEffect } from "react";
import "./App.css"

function App() {

  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [charArr, setCharArr] = useState([])
  const [loading, setLoading] = useState(false)
  const [losing, setLosing] = useState(false)

  // Function That Shuflles an array

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  let charactersArr = [];

  useEffect( () => {

    setLoading(true);
    
    getData().then((data) => {
      let newData = data.slice(0, (level + 1) *3 );
      charactersArr = newData.map((item, index) => {
        return {
          clicked: false,
          name: item.name,
          img: item.img
        }
      })
      return charactersArr;
    }).then((res) => {
      setCharArr(res)
      setLoading(false);
    });    
  }, [level])
    
  const cardClicked = (e) => {

    if (!charArr[e.target.id].clicked) {
      let newCharArr = charArr.map((item, index) => {
        if (index == e.target.id) {
          return ({
            name: item.name,
            img: item.img,
            id: index,
            clicked: true
          })
        } else {
          return item;
        }
    
      })
      
      shuffle(newCharArr)
      setCharArr(newCharArr)
      setCurrentScore(currentScore + 1)
    } else {
      setLosing(true);
      
    }
  
  }


  let card = charArr.map((item, index) => {
    return (
      <img src={item.img} onClick={cardClicked} className="card" id={index}></img>
    )
  })

  const handleCurrentScore = () => {
    setCurrentScore(currentScore + 1);  
  }

  useEffect(() => {
    if (currentScore > highestScore) {
      setHighestScore(currentScore);
    }
  }, [currentScore]);

  useEffect(() => {
    
    let result = charArr.every((item) => {
      return item.clicked
    });

    if (result && charArr.length > 0 ) {
      setLevel(level + 1)
    }

  }, [charArr]);

  const reset = () => {
    setCurrentScore(0);
  }

  const handleLevel = () => {
    setLevel(level + 1)  
  }

  async function getData() {
    
    try {
        let response = await fetch('https://breakingbadapi.com/api/characters', {mode: 'cors'});
        response = await response.json();
        
        let result = response.map(item => {
            return ({
                name: item.name,
                img: item.img
            })
        })

        shuffle(result)

        return result;
        
    } catch (err) {
        console.log("errooooor")
    };
  }

  const handleRestart = () => {
    setLosing(false)
    setLevel(1)
    reset()
  }

  if (loading) {
    return (
      <div>
        <h1>It's Loading ...</h1>
      </div>
    )
  } else if (losing) {
    return (
      <div>
        <h1>You Lost</h1>
        <button onClick={handleRestart}>Restart</button>
      </div>
    )
  } 
  else {

    return (
      <div className="App">
        <h1>Current Score {currentScore} </h1>
        <h1>Highest Score {highestScore} </h1>
        <h1>Level {level}</h1>
        {card}
      </div>
    );

  }

  
}

export default App;

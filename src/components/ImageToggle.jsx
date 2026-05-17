import React, { useEffect, useState } from 'react';
import '../App.css'; // Import the CSS file for styling

function ImageToggle({ src, alt, stats, setStats, itemStats, checkboxes, clear }) {
  const [isSelected, setIsSelected] = useState(false);

  function changeStats(x){
    setStats(prev => {
      const newStats = [...prev]
      for(let e of itemStats){
        newStats[e] += x
      }
      return newStats
    })
  }


  useEffect(()=>{
    if(isSelected){
      handleClick()
    }
  }, [clear])

  const handleClick = () => {
    if(isSelected){
      changeStats(-1)
    }
    else{
      changeStats(1)
    }
    setIsSelected(!isSelected);
  };

  function isBad(){
    let numOverlaps = 0
    for(let e of itemStats){
      if(stats[e] !== 0) //each time there is an overlap
        numOverlaps++
    }
    return numOverlaps/(itemStats.length)
  }

  function borderColor(){
    let overlap = isBad()
    let free = itemStats.length * (1-overlap)
    if(!checkboxes.BORDERS)
      if(!isSelected)
        return "solid black 5px"
    switch(free){
      case 1:
        return "solid green 5px"
      case 2:
        return "solid blue 5px"
      case 3:
        return "solid purple 5px"
      case 4: 
        return "solid yellow 5px"
      case 0:
        if(!isSelected)
          return "solid black 5px"
    }
  }

  return (
    <img 
      src={src}
      alt={alt}
      className={`toggle-image ${isSelected ? 'selected' : ''} ${isBad() === 1 && checkboxes.GRAYSCALE ? 'bad' : ''}`}
      style={{border: borderColor(), margin: "5px"}}
      onClick={handleClick}
    />
  );
}

export default ImageToggle;

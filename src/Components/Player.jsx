import React, { useState } from 'react'

function Player({intialName,symbol,isActive,onChangeName}) {
    const[isEditing,setIsEditing]=useState(false);
    const[playerName,setPlayerName]=useState(intialName)

    function handleChange(event){
      setPlayerName(event.target.value)
    }

    function handleEditClick(){
      setIsEditing(
        (editing)=>!editing);
        if(isEditing){
          onChangeName(symbol, playerName);
        }
    }

    let playerNameEdit =<span className="player-name">{playerName}</span>;
    if(isEditing){
      playerNameEdit=
      <input type="text"
      required value={playerName}  
      onChange={handleChange}
      />
    }

  return (
    <li className={isActive ? 'active':undefined}>
      <span className="player">
        {playerNameEdit}
        <span className="player-symbol">
          {symbol}
        </span>
      </span>
      <button 
      onClick={handleEditClick}>{isEditing ? 'Save' :'Edit'}
      </button>
    </li>
  )
}

export default Player

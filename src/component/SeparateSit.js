import React, { Component } from 'react';
import seats from './Seats';

const Ttable=seats=> {
  const teamMap = {1:"경록", 2:"진주", 3:"윤준", 4:"창환", 5:"조총", 6:"다은", 7:"송", 8:"상수", 9:"예나", 10:"은진"}
  console.log(seats.seats);
  return(
    <div>
      <br/>
      <table border="1px">
        <tbody>
        <tr>
          <td></td>
          <td>{seats.seats.week}</td>
          <td>주차</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{teamMap[seats.seats.seats[0]]}</td>
          <td>{teamMap[seats.seats.seats[3]]}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{teamMap[seats.seats.seats[1]]}</td>
          <td>{teamMap[seats.seats.seats[4]]}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{teamMap[seats.seats.seats[2]]}</td>
          <td>{teamMap[seats.seats.seats[5]]}</td>
          <td></td>
        </tr>
        <tr>
          <td>{teamMap[seats.seats.seats[6]]}</td>
          <td>{teamMap[seats.seats.seats[7]]}</td>
          <td>{teamMap[seats.seats.seats[8]]}</td>
          <td>{teamMap[seats.seats.seats[9]]}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

class SeparateSit extends Component{
  render(){
    return (
      <div>
        자리배치
        {seats.items.map((item, key)=><Ttable seats={item}/>)}
      </div>
    );
  }
}


export default SeparateSit;

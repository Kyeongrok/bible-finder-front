import React, { Component } from 'react';

const Ttable=seats=> {
  const teamMap = {1:"", 2:"", 3:"", 4:"", 5:"", 6:"", 7:"", 8:"", 9:"", 10:""}
  console.log(seats.seats);
  return(
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
        <td>{seats.seats.seats[0]}</td>
        <td>{seats.seats.seats[3]}</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>{seats.seats.seats[1]}</td>
        <td>{seats.seats.seats[4]}</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>{seats.seats.seats[2]}</td>
        <td>{seats.seats.seats[5]}</td>
        <td></td>
      </tr>
      <tr>
        <td>{seats.seats.seats[6]}</td>
        <td>{seats.seats.seats[7]}</td>
        <td>{seats.seats.seats[8]}</td>
        <td>{seats.seats.seats[9]}</td>
      </tr>
      </tbody>


    </table>
  )
}

class SeparateSit extends Component{
  constructor(props) {
    super(props);
  }

  getSeats() {
    const seats = {"items":[
        {"week":9, "seats":[1, 2, 6, 10, 8, 3, 4, 5, 7, 9]},
      ]}
    return seats;
  }

  render(){
    const seats = this.getSeats();

    return (
      <div>
        자리배치
        <Ttable seats={seats.items[0]}/>
      </div>
    );
  }
}


export default SeparateSit;

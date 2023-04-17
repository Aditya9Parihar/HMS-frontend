import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import { columnData } from "./Customer";

const Authorizer = () => {
  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelCity, setHotelCity] = useState("");
  const [rating, setRating] = useState(0);

  const [data, setData] = useState([
    {hotleId: 2, hotelName: 'Guru kripa', hotelAddress: 'Vijay nagar', hotelCity: 'Indore', rating: 4}, {hotleId: 2, hotelName: 'Guru kripa', hotelAddress: 'Vijay nagar', hotelCity: 'Indore', rating: 4}],
  );

  const onChangeHotelName = (e) => {
    setHotelName(e.target.value);
  };

  const onChangeHotelAddress = (e) => {
    setHotelAddress(e.target.value);
  };

  const onChangeHotelCity = (e) => {
    setHotelCity(e.target.value);
  };

  const onChangeRating = (e) => {
    setRating(e.target.value);
  };

 const onSubmit = async (e) => {
    e.preventDefault();
    const newHotel = {
      hotelName: hotelName,
      hotelAddress: hotelAddress,
      hotelCity: hotelCity,
      rating: rating
    };
    await axios.post("http://localhost:8090/hotelManagementSystem/createHotel", newHotel)
      .then((res => {
        console.log(res);
        setData([...data, res.data]);
      }))
      .catch((err) => console.log(err));
      
  };

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8090/hotelManagementSystem/getAllHotels");
      setData(result.data);
    })();
  }, [data]);
  
  return (
    <>
    <div style={{padding:"30px"}}>
        <h1 style={{color:"blue"}}>Welcome Authorizer</h1>
        <h2>Would you like to add a new hotel?!</h2>
        <form onSubmit={onSubmit} className="container">
        <div className="mb-3" style={{marginLeft: "10px", marginBottom: "10px"}}>
            <label className="form-label" style={{marginRight:"10px"}}>Hotel Name:</label>
            <input onChange={onChangeHotelName} className="form-control" type="text"></input>
        </div>
        <div className="mb-3" style={{marginLeft: "10px", marginBottom: "10px"}}>
            <label className="form-label" style={{marginRight:"10px"}}>Hotel Address:</label>
            <input onChange={onChangeHotelAddress} className="form-control" type="text"></input>
        </div>
        <div className="mb-3" style={{marginLeft: "10px", marginBottom: "10px"}}>
                <label className="form-label" style={{marginRight:"10px"}}>Hotel City:</label>
                <input onChange={onChangeHotelCity} className="form-control" type="text"></input>
            </div>
        <div className="mb-3" style={{marginLeft: "10px", marginBottom: "10px"}}>
                <label className="form-label" style={{marginRight:"10px"}}>Rating:</label>
                <input onChange={onChangeRating} className="form-control" type="number"></input>
            </div>
        <button type="submit" style={{backgroundColor:"deepskyblue", marginLeft: "10px"}}>ADD</button>
        </form>
        <Table data={data} columns={columnData}/>
    </div>
    </>
    
  );
};
export default Authorizer;

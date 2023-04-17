import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import Table from './Table';

export const columnData = [
  {
    Header: 'Hotel List',
    columns: [
      {
        Header: 'Hotel Id',
        accessor: 'hotleId',
      },
      {
        Header: 'Hotel Name',
        accessor: 'hotelName',
      },
      {
        Header: 'Hotel Address',
        accessor: 'hotelAddress',
      },
      {
        Header: 'Hotel City',
        accessor: 'hotelCity'
      },
      {
        Header: 'Rating',
        accessor: 'rating',
      }
    ],
  }
]

const Customer = () => {

  const [data, setData] = useState([
    {hotleId: 2, hotelName: 'Guru kripa', hotelAddress: 'Vijay nagar', hotelCity: 'Indore', rating: 4}, {hotleId: 2, hotelName: 'Guru kripa', hotelAddress: 'Vijay nagar', hotelCity: 'Indore', rating: 4}],
  );

  const queryData = useRef('');

  const [query, setQuery] = useState('city');

  const handleQueryChange = (evt) => {
    queryData.current = evt.target.value;
  }

  const handleChange = (event) => {

    setQuery(event.target.value);
 
  }; 

  const onSearch = async ({value}) => {
    let result = {};
    
    if(query === 'city'){
       result = await axios(`http://localhost:8090/hotelManagementSystem/getHotelByCity/${value}`);
       console.log(query);
    }else{
       result = await axios(`http://localhost:8090/hotelManagementSystem/getHotelByName/${value}`);
       console.log(query);
    }
    setData(result.data);
  }
  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8090/hotelManagementSystem/getAllHotels");
      setData(result.data);
    })();
  }, []);

  return (
    <div style={{padding: 30}}>
      <h1 style={{color: "blue"}}>Welcome Customers</h1>
      <h2>These are the hotels around you</h2>
      <div style={{padding: 10}}><input onChange={(e)=>handleQueryChange(e)}/><select value={query} onChange={handleChange}>
        <option value="city">City</option>
        <option value="name">Name</option>
      </select>
      <button onClick={() => onSearch({value: queryData.current} )} style={{margin: 10}}>Search</button>
      </div>
      
   <Table data={data} columns={columnData}/>
   </div>
  )
}

export default Customer
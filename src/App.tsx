import { useState, useEffect } from 'react';
import { format } from 'date-fns';

 

import axios from 'axios';
import './App.css';

 

function App() {
    interface LocationData {
        locationName: any;
        state: any;
        country: any;
        zip: any;
        currency: any;
        createdOn: any;
        modifiedOn: any;
        taxyrStartdate: any;
        taxyrEnddate: any;
    }
    const[GetData, SetData] = useState <LocationData[]>([]);
    useEffect(() => {
        const getlocationdata = async() => {
            try
            {
                const res = await axios.get('http://localhost:7190/api/Location/GetAllLocations');
            //   /  console.log(res.data.slice(0,10));
               SetData(res.data);
            }
            catch (err)
            {
                console.log("Error", err);
            }
        };
        getlocationdata(); {/* to load date when page loads*/}

      
    })
    const editdata=(data: any)=>{
        console.log(data);

       }
       const deletedata=(data:any)=>{
        console.log(data);
       }
    
    
   
  return(
    <div className = 'container'>
<div className='card '>
    <div className='card-body'>
        <table className = 'table table-bordered table-hover'>
            <thead>
            <tr>
                <th>#</th>
                <th>Location Name</th>
                <th>State</th>
                <th>Conutry</th>
                <th>Zip</th>
                <th>Currency</th>
                <th>Created On</th>
                <th>Modified On</th>
                <th>Tax Start Date</th>
                <th>Tax End Date</th>
                <th colSpan={2} className='text-center'>Action</th>
            </tr>
            </thead>
            <tbody>
                {GetData.map((x,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{x.locationName}</td>
                        <td>{x.state}</td>
                        <td>{x.country}</td>
                        <td>{x.zip}</td>
                        <td>{x.currency}</td>
                        <td>{formatDate(x.createdOn)}</td> {/* to format string to date*/}
                        <td>{formatDate(x.modifiedOn)}</td>
                        <td>{formatDate(x.taxyrStartdate)}</td>
                        <td>{formatDate(x.taxyrEnddate)}</td>
                        <td><button className='btn btn-primary btn-sm' onClick={()=>editdata(x)}>Edit</button></td> {/* edit x */}
                        <td><button className='btn btn-danger btn-sm' onClick={()=>deletedata(x)}>Delete</button></td> {/* delete x */}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
</div>
</div>
  );
}

 

function formatDate(dateString:any) {
    if (!dateString) {
        return 'N/A'; 
    }
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
}
export default App;
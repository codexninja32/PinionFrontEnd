import { useState, useEffect } from 'react';
import { format } from 'date-fns';

 

import axios from 'axios';
import './App.css';

 

function App() {
    interface ActivityData {
        locationName: any;
        state: any;
        country: any;
        zip: any;
        currency: any;
        taxyrStartdate: any;
        taxyrEnddate: any;
        modifiedOn: any;
        CreatedOn: any;
    }
    const [data, setData] = useState <ActivityData[]>([]);
    useEffect(() => {
        const getactivitydata = async () => {
            try {
                const response = await axios.get('http://localhost:7190/api/Location/GetAllLocations');
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error Fetching Data:", error);
            }
        };
        getactivitydata();
    })

 

 

  return(
<div className='container'>
<div className='card'>
<div className='card-body'>
<h4 className='text-center'>GetData</h4>
<hr/>
<table className='table table-bordered'>
<thead>
<tr>
<th>#</th>
<th>Location Name</th>
<th>State</th>
<th>Country</th>
<th>Zip Code</th>
<th>Currency</th>
<th>Tax Start Date</th>
<th>Tax End Date</th>
<th>Last Updated On</th>
<th>Created On</th>
<th>Action</th>
</tr>
</thead>
<tbody>
          {data.map((x, index) => (
<tr key={index}>
<td>{index + 1}</td>
<td>{x.locationName}</td>
<td>{x.state}</td>
<td>{x.country}</td>
<td>{x.zip}</td>
<td>{x.currency}</td>
<td>{formatDate(x.taxyrStartdate)}</td>
<td>{formatDate(x.taxyrEnddate)}</td>
<td>{formatDate(x.modifiedOn)}</td>
<td>{formatDate(x.CreatedOn)}</td>
<td><button className="btn btn-primary btm-sm">Edit</button></td>
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
        return 'N/A'; // Handle the case where dateString is not provided
    }

 

    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
}
export default App;
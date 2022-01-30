import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../utils/fetchConstants';
function Users(props) {
  const [apiData, setApiData] = useState([]);
  const paramId = useParams().id;
  useEffect(() => {
    const fetchApiData = async () => {
      const data = await getData('home/search');
      console.log('data received --------->', data);
      if (data.length) {
        let filteredData = data.filter((value, i) => {
          return value.id === paramId;
        });
        setApiData(filteredData);
      }
    };
    fetchApiData();
  }, [paramId]);

  return (
    <div>
      {apiData.length > 0 ? (
        <div>
          {apiData.map((value, i) => {
            return (
              <div className="card" key={i}>
                <div className="card-body">
                  <h5 className="card-title">{value.id}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {value.name}
                  </h6>
                  {value.address}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">No Record Found!!</h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;

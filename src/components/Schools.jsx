import { useEffect, useState } from 'react';
import axios from 'axios';

const authAxios = axios.create({
  headers: { 'x-access-token': localStorage.getItem('token') },
});

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await authAxios.get('http://localhost:3008/api/schools');
      if (response.data.schools === undefined) throw Error;

      // we received a list of schools
      setSchools(response.data.schools);
      setLoading(false);
    } catch (error) {
      console.log('unable to retrieve schools');
      console.log(error);
    }
  };

  if (loading) return <h1>loading...</h1>;

  return (
    <>
      <h1>all schools:</h1>
      <ul>
        {schools &&
          schools.map((school) => {
            return <li key={school.id}>{school.name}</li>;
          })}
      </ul>
    </>
  );
};

export default Schools;

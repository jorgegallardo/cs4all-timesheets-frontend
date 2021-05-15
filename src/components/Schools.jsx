import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react';

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
      <Table compact="very" selectable celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>DBN</Table.HeaderCell>
            <Table.HeaderCell width={1}>District</Table.HeaderCell>
            <Table.HeaderCell width={6}>School Name</Table.HeaderCell>
            <Table.HeaderCell width={4}>Principal</Table.HeaderCell>
            <Table.HeaderCell width={4}>CS4All Teacher(s)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {schools &&
            schools.map((school) => {
              return (
                <Table.Row key={school.id}>
                  <Table.Cell>{school.dbn}</Table.Cell>
                  <Table.Cell>{school.district}</Table.Cell>
                  <Table.Cell>{school.name}</Table.Cell>
                  <Table.Cell>{school.principal}</Table.Cell>
                  <Table.Cell>
                    {school.teachers.length === 1
                      ? school.teachers.map((teacher) => (
                          // use actual teacher ids for keys, not a random num
                          <span key={Math.random()}>{teacher}</span>
                        ))
                      : school.teachers.map((teacher) => (
                          <span key={Math.random()}>{teacher}, </span>
                          // figure out a way to remove the comma from the last item
                        ))}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

export default Schools;

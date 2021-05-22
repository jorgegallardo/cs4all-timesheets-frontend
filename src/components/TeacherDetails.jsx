import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import UserContext from '../store/user-context';

const TeacherDetails = () => {
  const { userData } = useContext(UserContext);
  const [stats, setStats] = useState({});

  console.log(userData);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(process.env.REACT_APP_API_SERVER + '/users/userStats', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });

      const userStats = response.data;
      setStats(userStats);
    };

    getData();
  }, [])

  return (
    <>
      <Table celled striped columns={2} compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">My Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="envelope outline" /> CS4All Program Name
            </Table.Cell>
            <Table.Cell>{userData.programTitle}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="envelope outline" /> CS4All Point of Contact
            </Table.Cell>
            <Table.Cell>{userData.pointOfContact && userData.pointOfContact.firstName + ' ' + userData.pointOfContact.lastName + ' (' + userData.pointOfContact.email + ')'}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="envelope outline" /> Email Address
            </Table.Cell>
            <Table.Cell>{userData.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="hashtag" /> File Number
            </Table.Cell>
            <Table.Cell>{userData.fileNumber}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> DBN
            </Table.Cell>
            <Table.Cell>{userData.school.dbn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> District
            </Table.Cell>
            <Table.Cell>{userData.school.district}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> School
            </Table.Cell>
            <Table.Cell>{userData.school.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> Grades Taught
            </Table.Cell>
            <Table.Cell>{userData.gradesTaught.map((grade, index) => {
              return ((index > 0 ? ', ' : '') + grade);
            })}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> PD Hours Submitted, Awaiting
              Approval
            </Table.Cell>
            <Table.Cell>{stats.hoursPending}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> PD Hours Approved &amp; Processing
            </Table.Cell>
            <Table.Cell>{stats.hoursApproved}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> PD Hours Processed
            </Table.Cell>
            <Table.Cell>{stats.hoursProcessed}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default TeacherDetails;

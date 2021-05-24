import { Dropdown, Input, Table, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const filterByOptions = [
  'view all',
  'integrated units',
  'courses',
  'sepjr',
  'cs leads',
  'pending approval',
  'approved, processing',
  'processed',
  'denied',
];

const AdminAllTimesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [filteredTimesheets, setFilteredTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState(filterByOptions[0]);

  useEffect(() => {
    fetchTeacherTimesheets();
  }, []);

  useEffect(() => {
    const newFilteredTimesheets = [...timesheets].filter((timesheet) => {
      const categories = timesheet.events.map((event) => event.event.category);
      if (filterBy === 'view all') {
        return true;
      } else if (
        filterBy === 'integrated units' &&
        categories.indexOf('units') >= 0
      ) {
        return true;
      } else if (filterBy === 'courses' && categories.indexOf('courses') >= 0) {
        return true;
      } else if (filterBy === 'sepjr' && categories.indexOf('sep-jr') >= 0) {
        return true;
      } else if (
        filterBy === 'cs leads' &&
        categories.indexOf('cs-leads') >= 0
      ) {
        return true;
      } else if (
        filterBy === 'pending approval' &&
        timesheet.status === 'pending'
      ) {
        return true;
      } else if (
        filterBy === 'approved, processing' &&
        timesheet.status === 'approved'
      ) {
        return true;
      } else if (filterBy === 'processed' && timesheet.status === 'processed') {
        return true;
      } else if (filterBy === 'denied' && timesheet.status === 'denied') {
        return true;
      }
      return false;
    });
    setFilteredTimesheets(newFilteredTimesheets);
  }, [timesheets, filterBy]);

  const fetchTeacherTimesheets = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_SERVER + '/timesheets',
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      const timesheets = response.data;

      // we received a list of timesheets
      setTimesheets(timesheets);
      setLoading(false);
    } catch (error) {
      console.error('unable to retrieve timesheets: ' + error);
    }
  };

  if (loading) return <h1>loading...</h1>;

  return (
    <>
      <h2>all timesheets</h2>
      <Dropdown
        text={'Filter: ' + filterBy}
        icon="filter"
        floating
        labeled
        button
        className="icon"
      >
        <Dropdown.Menu>
          <Dropdown.Header content="Find Teacher" />
          <Input icon="search" iconPosition="left" name="search" />
          <Dropdown.Header icon="tags" content="Filter by" />
          <Dropdown.Divider />
          {filterByOptions.map((option, index) => {
            return (
              <Dropdown.Item key={index} onClick={() => setFilterBy(option)}>
                {option}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>CS4All Program</Table.HeaderCell>
            <Table.HeaderCell>PD/Event Title</Table.HeaderCell>
            <Table.HeaderCell>Teacher</Table.HeaderCell>
            <Table.HeaderCell>Timesheet</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredTimesheets.map((timesheet) => (
            <Table.Row key={timesheet._id}>
              <Table.Cell>
                {format(parseISO(timesheet.events[0].begin), 'MM/dd/yy')}
              </Table.Cell>
              <Table.Cell>{timesheet.events[0].event.category}</Table.Cell>
              <Table.Cell>{timesheet.events[0].event.title}</Table.Cell>
              <Table.Cell>
                {timesheet.teacher.firstName} {timesheet.teacher.lastName}
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="mini"
                  color="purple"
                  onClick={() => {
                    window.open(timesheet.filename);
                  }}
                >
                  view
                </Button>
              </Table.Cell>
              <Table.Cell>{timesheet.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default AdminAllTimesheets;

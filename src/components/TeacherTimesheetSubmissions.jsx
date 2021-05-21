import { useState, useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
// import axios from 'axios';

const TeacherTimesheetSubmissions = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hardcodedTimesheets = [
      {
        id: 1,
        title: 'Intro to CS',
        createdOn: '4/14/21',
        date: '4/1/21',
        firstName: 'dr.',
        lastName: 'dre',
        fileNumber: '888888',
        programTitle: 'Integrated Units',
        startTime: '3:00',
        endTime: '4:00',
        facilitators: ['bob', 'george'],
        status: 'pending approval',
        linkToTimesheetPdf: 'lol.pdf',
      },
      {
        id: 2,
        title: 'Abstraction',
        createdOn: '4/16/21',
        date: '4/2/21',
        firstName: 'dr.',
        lastName: 'dre',
        fileNumber: '888888',
        programTitle: 'Integrated Units',
        startTime: '4:00',
        endTime: '5:00',
        facilitators: ['amy'],
        status: 'pending approval',
        linkToTimesheetPdf: 'haha.pdf',
      },
    ];
    setTimesheets(hardcodedTimesheets);
    setLoading(false);
  }, []);

  if (loading) return <h1>loading...</h1>;

  return (
    <>
      <h2>previously submitted timesheets</h2>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Submitted On</Table.HeaderCell>
            <Table.HeaderCell>PD/Event Title</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
            <Table.HeaderCell>Facilitator(s)</Table.HeaderCell>
            <Table.HeaderCell>Timesheet</Table.HeaderCell>
            <Table.HeaderCell>Payment Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {timesheets.length === 0 ? (
            <h1>loading...</h1>
          ) : (
            timesheets.map((timesheet) => {
              return (
                <Table.Row key={timesheet.id}>
                  <Table.Cell>{timesheet.createdOn}</Table.Cell>
                  <Table.Cell>{timesheet.title}</Table.Cell>
                  <Table.Cell>{timesheet.date}</Table.Cell>
                  <Table.Cell>{timesheet.startTime}</Table.Cell>
                  <Table.Cell>{timesheet.endTime}</Table.Cell>
                  <Table.Cell>
                    {timesheet.facilitators.length === 1
                      ? timesheet.facilitators.map((facilitator) => (
                          // use actual facilitator ids for keys, not a random num
                          <span key={Math.random()}>{facilitator}</span>
                        ))
                      : timesheet.facilitators.map((facilitator) => (
                          <span key={Math.random()}>{facilitator}, </span>
                          // figure out a way to remove the comma from the last item
                        ))}
                  </Table.Cell>
                  <Table.Cell>
                    {/* the button should work as a link to the actual timesheet using timesheet.linkToTimesheetPdf*/}
                    <Button size="mini" color="purple">
                      download
                    </Button>
                  </Table.Cell>
                  {/* add conditional formatting to the status */}
                  <Table.Cell>{timesheet.status}</Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default TeacherTimesheetSubmissions;

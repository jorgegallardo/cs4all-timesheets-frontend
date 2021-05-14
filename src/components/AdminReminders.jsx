import { Grid, Message } from 'semantic-ui-react';

const AdminReminders = () => {
  return (
    <>
      <h1>reminders</h1>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Message warning>
            <Message.Header>to do</Message.Header>
            <Message.List>
              <Message.Item>
                there are 932 timesheets awaiting your signature & approval
              </Message.Item>
              <Message.Item>83 teachers are missing OP-175 forms</Message.Item>
            </Message.List>
          </Message>
        </Grid.Column>
        <Grid.Column>
          <Message positive>
            <Message.Header>upcoming pds/events</Message.Header>
            <Message.List>
              <Message.Item>5/5/21 - Units: Abstraction</Message.Item>
            </Message.List>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default AdminReminders;

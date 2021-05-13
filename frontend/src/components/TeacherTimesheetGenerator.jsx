import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import { Button, Form, Radio, Step, Segment } from 'semantic-ui-react';

const TeacherTimesheetGenerator = () => {
  const canvas = useRef(null);
  const [signaturePad, setSignaturePad] = useState(null);
  const [value, setValue] = useState('001');
  const handleChange = (event, { value }) => setValue(value);

  const handleSubmit = async () => {
    // we should add frontend validation checks here too (in addition to the empty signature check below)
    if (signaturePad.isEmpty()) {
      alert('you forgot to sign the pad!');
      return;
    }
    // const dataUrl = signaturePad.toDataURL();
    // console.log(dataUrl);
    signaturePad.clear();

    // const response = await fetch('http://localhost:3004/timesheets', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     firstName,
    //     lastName,
    //     fileNumber,
    //     signatureData: dataUrl,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const resData = await response.json();
    // console.log(resData);
    // alert('timesheet submitted.');
  };

  useEffect(() => {
    setSignaturePad(new SignaturePad(canvas.current));
  }, []);

  return (
    <>
      <h2>instructions</h2>
      <div>
        <Step.Group ordered fluid attached="top" widths={3}>
          <Step active>
            <Step.Content>
              <Step.Title>select</Step.Title>
              <Step.Description>
                the cs4all pd or event you attended from the list below
              </Step.Description>
            </Step.Content>
          </Step>

          <Step active>
            <Step.Content>
              <Step.Title>sign</Step.Title>
              <Step.Description>
                the signature pad using your mouse, touchpad, or finger
              </Step.Description>
            </Step.Content>
          </Step>

          <Step active>
            <Step.Content>
              <Step.Title>submit</Step.Title>
              <Step.Description>
                press the submit timesheet button!
              </Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>

        <Segment attached>
          <Form>
            <Form.Field>
              <Radio
                label="5/3/21 - Units: Intro to CS from 3-4pm"
                name="radioGroup"
                value="001"
                checked={value === '001'}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="5/4/21 - Units: Intro to CS from 3-4pm"
                name="radioGroup"
                value="002"
                checked={value === '002'}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="5/5/21 - Units: Intro to CS from 3-4pm"
                name="radioGroup"
                value="003"
                checked={value === '003'}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Group>
              <Form.Field>
                <h5 style={{ marginBottom: '4px' }}>Sign Below</h5>
                <canvas
                  ref={canvas}
                  style={{
                    border: '1px solid black',
                    borderRadius: '5px',
                  }}
                  width="345"
                  height="100"
                />
              </Form.Field>
            </Form.Group>
            <Button onClick={handleSubmit} primary>
              submit timesheet
            </Button>
            <Button onClick={() => signaturePad.clear()}>
              clear signature pad
            </Button>
          </Form>
        </Segment>
      </div>
    </>
  );
};

export default TeacherTimesheetGenerator;

import timeImg from '../assets/images/time.jpg';
import Homepage from './Homepage';
import cs4allLogo from '../assets/images/cs4all_horizontal.png';
import { Image } from 'semantic-ui-react';

const Splash = () => {
  const divStyleForBrowser = {
    backgroundImage:
      'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(' +
      timeImg +
      ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '30px',
    paddingRight: '150px',
  };

  return (
    <>
      <Image src={cs4allLogo} style={{ position: 'fixed', zIndex: '100' }} />
      <div style={divStyleForBrowser}>
        <div
          style={{
            textAlign: 'center',
            width: '90%',
            maxWidth: '500px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '5px',
              padding: '20px',
            }}
          >
            <Homepage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Splash;

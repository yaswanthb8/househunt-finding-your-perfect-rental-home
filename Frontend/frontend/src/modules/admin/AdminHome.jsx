import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import AllBookings from './AllBookings';
import AllProperty from './AllProperty';
import AllUsers from './AllUsers';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const AdminHome = () => {
  const user = useContext(UserContext)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (!user) {
    return null;;
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand><h2>RentEase</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav>
              <h5 className='mx-3'>Hi {user.userData.name}</h5>
              <Link onClick={handleLogOut} to={'/'}>Log Out</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Nav>
  <h5 className='mx-3'>Hi Admin</h5>
  <Link onClick={handleLogOut} to={'/'}>Log Out</Link>
</Nav>


      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All Users" {...a11yProps(0)} />
            <Tab label="All Properties" {...a11yProps(1)} />
            <Tab label="All Bookings" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AllUsers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default AdminHome

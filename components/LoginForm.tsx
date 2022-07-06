import React, {FC} from "react";
import {
  Grid,
  Avatar,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import ButtonComponent from "./Button";
import Vuser from '@mui/icons-material/VerifiedUser'


const Login:FC = () => {
  const paperStyle:React.CSSProperties = { height: "80vh", width: 380 };
  const avatarStyle:React.CSSProperties = { backgroundColor: "#2124B1" };
  const btnstyle:React.CSSProperties = { margin: "8px 0", background: "#2124B1" };
  const mainContent:React.CSSProperties = {
    padding: "30px",
    display: "flex",
    gap: ".5rem",
    flexDirection: "column",
  };
  const topContent:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "#eee",
    justifyContent: "center",
    gap: "1rem",
  };
  const btmContent:React.CSSProperties = {
    background: "#eee",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
  };

  const gandl:React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '1rem'
  }
  return (
      <div style={paperStyle}>
        <Grid style={topContent}>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h4>Sign In</h4>
        </Grid>
        <div style={mainContent}>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            sx={{ marginTop: 3 }}
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <ButtonComponent innerText={'Sign In'} icon={<Vuser/>}/>
        </div>
        <div style={gandl}>
        <ButtonComponent innerText={'Google'} icon={<Vuser/>}/>
        <ButtonComponent innerText={'LinkedIn'} icon={<Vuser/>}/>
        </div>
        <div style={btmContent}>
          <Image src={"/kwik.png"} alt="Kwik Logo" width={128} height={43} />
        </div>
      </div>
  );
};

export default Login;

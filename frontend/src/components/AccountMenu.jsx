import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import imageDefault from "../assets/user.png";

import { signout } from "../utils/Api/auth.api";

export default function AccountSettings() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleSignOut = async () => {
    const response = await signout();
    if (response) {
      navigate("/signin");
    }
  };

  const image = "https://scontent.fjal1-1.fna.fbcdn.net/v/t1.6435-1/40803316_471010213398089_1788049306855407616_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHzmCSQc2LGAEr1FtoO_ox9irWovm3s0zaKtai-bezTNn40V0fl_JZGRMlBmDW9pmvtkoReCicyRdWM_FKW8X2d&_nc_ohc=tYwIssQLGzwQ7kNvgFpDjwD&_nc_oc=Adh1rmJlyTYXy2MP1OwtmShbB4EIigPD6tTOP4oNgwMLD_px_cb_gtXSRx-LturIMp0Pyou5R9tEaaMU9lWJ0gT9&_nc_zt=24&_nc_ht=scontent.fjal1-1.fna&_nc_gid=AFKj6Gl8RI0YOfcRfWgFmwc&oh=00_AYAaz0YVNBEC3PtJcQtGATIDCCLRI-ces9KMp_xtn4SaCQ&oe=67BEB102";

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 50, height: 50 }}>
              <img
                src={image ? image : imageDefault}
                alt="Imagen de perfil"
              ></img>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="md:hidden">
          <MenuItem onClick={handleClose}>Todas</MenuItem>
          <MenuItem onClick={handleClose}>Terminadas</MenuItem>
          <MenuItem onClick={handleClose}>Por hacer</MenuItem>
        </div>
        <MenuItem onClick={handleClose}><Link to={'/settings'}>Ajustes</Link></MenuItem>
        <MenuItem onClick={() => { handleClose(); handleSignOut(); }}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
}

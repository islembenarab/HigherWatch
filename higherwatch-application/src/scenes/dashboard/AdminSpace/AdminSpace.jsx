import {Box, Button, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Header from "../../../components/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import {useNavigate} from "react-router-dom";


const AdminSpace = () => {
  const navigate=useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkMode = theme.palette.mode === "dark";
  const iconColor = isDarkMode ? colors.grey[100] : theme.palette.primary.main;
  const handleRegisterClick = () => {
    navigate("/registration")// Replace '/registration' with the path to your FormRegistration component
  };

  const handleManage =()=> {
      navigate("/manageAccounts")
  }

  const handleCreateRole = () => {
    navigate("/CreateRole")
  };
  return (
    <Box>
      {/* HEADER */}
      <Box mx={2} display={"flex"} justifyContent={"center"}>
        <Header title="Admin Space" />
      </Box>

      {/* CARD GRID */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="20px"
        bottom="10px"
        mt={4}
        mx={2} // Add horizontal margin
        my={2} // Add vertical margin
      >
        {/* Card 1: Register Users */}
        <Card>
          <CardContent>
            <PersonAddIcon sx={{ fontSize: 60, color: iconColor }} />
            <Typography variant="h5" component="div" mt={2}>
              Register Users
            </Typography>
            <Typography color="text.secondary">
              Create new user accounts and manage user registrations.
            </Typography>
          </CardContent>
          <CardActions >
            <Button variant="contained" color="primary" onClick={handleRegisterClick} >
              Register
            </Button>
          </CardActions>
        </Card>

        {/* Card 2: Manage Accounts */}
        <Card>
          <CardContent>
            <SupervisorAccountIcon sx={{ fontSize: 60, color: iconColor }} />
            <Typography variant="h5" component="div" mt={2}>
              Manage Accounts
            </Typography>
            <Typography color="text.secondary">
              View and manage user accounts, update account information, and
              perform administrative actions.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={handleManage}>
              Manage
            </Button>
          </CardActions>
        </Card>

        {/* Card 3: Create Roles */}
        <Card>
          <CardContent>
            <AssignmentIndIcon sx={{ fontSize: 60, color: iconColor }} />
            <Typography variant="h5" component="div" mt={2}>
              Create Roles
            </Typography>
            <Typography color="text.secondary">
              Define user roles and permissions, assign roles to users, and
              manage role-based access control.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={handleCreateRole}>
              Create
            </Button>
          </CardActions>
        </Card>

        {/* Card 4: Create Entities */}
        <Card>
          <CardContent>
            <AccountBalanceIcon sx={{ fontSize: 60, color: iconColor }} />
            <Typography variant="h5" component="div" mt={2}>
              Create Entities
            </Typography>
            <Typography color="text.secondary">
              Create and manage entities or objects in the system, such as
              organizations, projects, or departments.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">
              Create
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminSpace;

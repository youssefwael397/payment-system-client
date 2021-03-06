import * as React from "react";
import { useEffect, useState, useContext } from "react";
import {
  Button,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import userIcon from "./user-icon.png";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { UserContext } from "./../UserProvider";
// import DeleteUser from "./../DeleteUser/DeleteUser";
// import API_PATH from "../../API_PATH";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { clientssContext } from "./../ManagersProvider";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import { ClientsContext } from "./../ClientsProvider";
import BlockIcon from "@mui/icons-material/Block";

export default function Clients() {
  // const { user, token, isManager } = useContext(UserContext);
  const { clients } = useContext(ClientsContext);
  const [allClients, setAllClients] = useState([]);
  const [blockClients, setBlockClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setFilteredClients([...allClients]);
  }, [allClients]);

  useEffect(() => {
    setAllClients(clients);
  }, [clients]);

  useEffect(() => {
    if (searchValue !== "") {
      setFilteredClients(
        clients.filter(
          (user) =>
            user.client_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            String(user.client_id)
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            user.national_id
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            user.Sale.sales_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            user.phone.includes(searchValue.trim())
        )
      );
    }else{
      setFilteredClients(clients)
    }
  }, [clients, searchValue]);

  const getBlockedClients = () => {
    let block_clients = [];
    clients.map((client) => {
      if (client.is_blocked) {
        block_clients = [...block_clients, client];
      }
    });
    setBlockClients([...block_clients]);
    setFilteredClients([...block_clients]);
  };

  const getAllClients = () => {
    setBlockClients([]);
    setFilteredClients([...allClients]);
  };

  if (clients)
    return (
      <div className="AdminPanel-name my-2 rtl">
        {/* search input */}
        <TextField
          className="w-100 my-2 "
          id="outlined-basic"
          hiddenLabel
          variant="filled"
          placeholder="???????? ???????????? ???? ?????? ???????????? ???? ?????????? ???????????? ???? ?????? ????????????"
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />

        <Button
          size="medium"
          variant="contained"
          onClick={getAllClients}
        >
           ???? ??????????????
        </Button>
        <Button
          className="mx-3"
          size="medium"
          variant="contained"
          color="error"
          onClick={getBlockedClients}
        >
          ?????????????? ??????????????????
        </Button>
        {/* managers Container */}
        <div className="row mt-4">
          {filteredClients.map((client) => (
            <Card
              key={client.client_name}
              className="col-lg-4 col-md-6 col-xs-12 mb-4 p-4"
            >
              <CardMedia className="text-center mx-auto">
                <LazyLoadImage
                  alt={client.client_name}
                  src={userIcon}
                  width={"100%"}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  className="d-flex justify-content-between align-items-center"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  <div>{client.client_name}</div>
                  {client.is_blocked && <BlockIcon className="text-danger" />}
                </Typography>
                <div className="text-secondary">
                  <p className="fs-6 font-primary text-secondary">
                    {" "}
                    ?????? ???????????? : {client.client_id}
                  </p>
                  <p className="fs-6 font-primary text-secondary">
                    {" "}
                    ?????? ?????????????? : {client.Sale.sales_name}
                  </p>
                  <PhoneIcon className="my-1" /> {client.phone}
                  <br />
                  <i className="fa-solid fa-address-card fs-5"></i>{" "}
                  {client.national_id}
                </div>
              </CardContent>
              <CardActions className="d-flex justify-content-between">
                <div>
                  <Link
                    className="text-decoration-none mx-2"
                    to={`client/${client.client_id}`}
                  >
                    ????????????
                  </Link>
                </div>
              </CardActions>
            </Card>
          ))}
          {filteredClients.length < 1 && searchValue ? (
            <h4 className="mt-3">
              ???? ???????? ???????? ???????? ????????????????{" "}
              <span className="text-primary">{searchValue.trim()}</span>
            </h4>
          ) : null}
        </div>
      </div>
    );
  else return <LoadingSpinner />;
}

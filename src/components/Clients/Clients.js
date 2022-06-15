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

export default function Clients() {
  // const { user, token, isManager } = useContext(UserContext);
  const { clients } = useContext(ClientsContext);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue !== "") {
      setFilteredClients(
        clients.filter(
          (user) =>
            user.client_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            user.national_id
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            user.phone.includes(searchValue.trim())
        )
      );
    } else {
      setFilteredClients(clients);
    }
  }, [clients, searchValue]);

  if (clients)
    return (
      <div className="AdminPanel-name my-2 rtl">
        {/* search input */}
        <TextField
          className="w-100 my-2 "
          id="outlined-basic"
          hiddenLabel
          variant="filled"
          placeholder="ابحث بالإسم أو رقم الهاتف أو الرقم القومي"
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />

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
                <Typography gutterBottom variant="h5" component="div">
                  {client.client_name}
                </Typography>
                <Typography color="text.secondary">
                  <PhoneIcon className="my-1" /> {client.phone}
                  <br />
                  {client.national_id}
                </Typography>
              </CardContent>
              <CardActions className="d-flex justify-content-between">
                <div>
                  <Link
                    className="text-decoration-none mx-2"
                    to={`client/${client.client_id}`}
                  >
                    المزيد

                  </Link>
                </div>
              </CardActions>
            </Card>
          ))}
          {filteredClients.length < 1 && searchValue ? (
            <h4 className="mt-3">
              لا يوجد عميل بهذه البيانات{" "}
              <span className="text-primary">{searchValue.trim()}</span>
            </h4>
          ) : null}
        </div>
      </div>
    );
  else return <LoadingSpinner />;
}

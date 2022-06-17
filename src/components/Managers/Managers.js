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
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { UserContext } from "./../UserProvider";
// import DeleteUser from "./../DeleteUser/DeleteUser";
// import API_PATH from "../../API_PATH";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ManagersContext } from "./../ManagersProvider";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";

export default function Managers() {
  const { user, token } = useContext(UserContext);
  const { managers } = useContext(ManagersContext);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue !== "") {
      setFilteredManagers(
        managers.filter(
          (user) =>
            user.manager_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            user.national_id
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            user.email
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            user.phone.includes(searchValue.trim())
        )
      );
    } else {
      setFilteredManagers(managers);
    }
  }, [managers, searchValue]);

  if (managers)
    return (
      <div className="AdminPanel-name my-2 rtl">
        {/* search input */}
        <TextField
          className="w-100 my-2 "
          id="outlined-basic"
          hiddenLabel
          variant="filled"
          placeholder="ابحث بالإسم أو البريد الإلكتروني أو رقم الهاتف أو الرقم القومي"
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />

        {/* managers Container */}
        <div className="row mt-4">
          {filteredManagers.map((manager) => (
            <Card
              key={manager.manager_name}
              className="col-lg-4 col-md-6 col-xs-12 mb-4 p-4"
            >
              <CardMedia className="text-center mx-auto">
                <LazyLoadImage
                  alt={manager.manager_name}
                  src={`data:image/png;base64, ${manager.manager_img}`}
                  // height="400"
                  width={"100%"}
                />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {manager.manager_name}
                </Typography>
                <Typography color="text.secondary">
                  <EmailIcon className="my-1" /> {manager.email}
                  <br />
                  <i className="fa-solid fa-address-card fs-5"></i>{" "}
                  {manager.national_id}
                  <br />
                  <PhoneIcon className="my-1" /> {manager.phone}
                  <br />
                  <a
                    className="text-decoration-none"
                    href={manager.facebook_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="small">
                      <FacebookIcon /> رابط الفيسبوك
                    </Button>
                  </a>
                </Typography>
              </CardContent>
              <CardActions className="d-flex justify-content-between">
                <div>
                  <Link
                    className="text-decoration-none mx-2"
                    to={`manager/${manager.manager_id}`}
                  >
                    المزيد...
                  </Link>
                </div>
                {/* <div>
                  <DeleteUser
                    role="manager"
                    user_name={manager.manager_name}
                    user_id={manager.manager_id}
                  />
                </div> */}
              </CardActions>
            </Card>
          ))}
          {filteredManagers.length < 1 && searchValue ? (
            <h4 className="mt-3">
              لا يوجد مدير بهذه البيانات{" "}
              <span className="text-primary">{searchValue.trim()}</span>
            </h4>
          ) : null}
        </div>
      </div>
    );
  else return <LoadingSpinner />;
}

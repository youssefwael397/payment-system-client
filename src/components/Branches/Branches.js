import * as React from "react";
import { useEffect, useState, useContext } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NameInput from "./../NameInput/NameInput";
import { BranchesContext } from "./../BranchesProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { UserContext } from "./../UserProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import EditImage from "./../EditImage/EditImage";
import LockBranch from "./../LockBrannch/LockBranch";

export default function Branches() {
  const { branches } = useContext(BranchesContext);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue !== "") {
      setFilteredBranches(
        branches.filter(
          (branch) =>
            branch.branch_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            branch.branch_address
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim())
        )
      );
    } else {
      setFilteredBranches(branches);
    }
  }, [branches, searchValue]);

  if (branches)
    return (
      <div className="AdminPanel-name my-2 rtl">
        {/* search input */}
        <TextField
          className="w-100 my-2 "
          id="outlined-basic"
          hiddenLabel
          variant="filled"
          placeholder="ابحث بالإسم أو العنوان "
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />

        {/* managers Container */}
        <div className="row mt-4">
          {filteredBranches.map((branch) => (
            <Card
              key={branch.branch_name}
              className="col-lg-4 col-md-6 col-xs-12 mb-4 p-4"
            >
              <CardMedia className="text-center mx-auto position-relative">
                <LazyLoadImage
                  className="profile-image rounded text-center mx-auto w-100"
                  alt={branch.branch_name}
                  src={`data:image/png;base64, ${branch.logo}`}
                  // height="400"
                  width={"100%"}
                />
                <EditImage
                  user_id={branch.branch_id}
                  role="branch"
                  label={"شعار الفرع"}
                />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {branch.branch_name}
                </Typography>
                <Typography color="text.secondary">
                  <LocationOnIcon className="my-1" /> {branch.branch_address}
                </Typography>
                <div>
                  <EditBranch branchInfo={branch} />
                  <LockBranch
                    id={branch.branch_id}
                    role={branch.isLock ? "unlock" : "lock"}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredBranches.length < 1 && searchValue ? (
            <h4 className="mt-3">
              لا يوجد فرع بهذه البيانات{" "}
              <span className="text-primary">{searchValue.trim()}</span>
            </h4>
          ) : null}
        </div>
      </div>
    );
  else return <LoadingSpinner />;
}

const EditBranch = ({ branchInfo }) => {
  const { user, token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [branchId, setBranchId] = useState();
  const [branchName, setBranchName] = useState();
  const [branchAddress, setBranchAddress] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (branchInfo) {
      setBranchId(branchInfo.branch_id);
      setBranchName(branchInfo.branch_name);
      setBranchAddress(branchInfo.branch_address);
    }
  }, [branchInfo]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [success]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setErr("");
    let form = new FormData();
    form.append("branch_name", branchName);
    form.append("branch_address", branchAddress);
    const url = `${API_PATH}/branch/update/${branchInfo.branch_id}`;
    const res = await fetch(url, {
      method: "PUT",
      body: form,
      headers: { Authorization: token },
    });
    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) {
      setErr(data.error);
    } else {
      setSuccess("تم تعديل الفرع بنجاح");
    }
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        تعديل الفرع
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form sx={style} onSubmit={(e) => handleUpdate(e)}>
            <AddName branchName={branchName} setBranchName={setBranchName} />
            <AddLocation
              location={branchAddress}
              setLocation={setBranchAddress}
            />
            <SubmitButton submitLabel="تعديل" />
            {success && <p className="text-center text-success">{success}</p>}
            {err && <p className="text-center text-danger">{err}</p>}
            {isLoading && <LoadingSpinner />}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

const AddLocation = ({ location, setLocation }) => {
  const [value, setValue] = React.useState("manual");
  let locationValid = true;

  if (location) {
    const pattern = /[^a-z]/i;
    locationValid = pattern.test(location);
  }

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !locationValid && "text-danger"
      }`}
    >
      {/* <LocationRadioInput value={value} handleChange={handleChange} /> */}
      <label htmlFor="location">عنوان الفرع</label>
      {value === "manual" ? (
        <LocationTextInput location={location} setLocation={setLocation} />
      ) : null}
    </div>
  );
};

const LocationTextInput = ({ location, setLocation }) => {
  return (
    <TextField
      className="mx-3 font-cairo"
      required
      id="location"
      placeholder="شارع الجيش "
      variant="standard"
      name="email"
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  );
};

const AddName = ({ branchName, setBranchName }) => {
  let nameValid = true;
  if (branchName) {
    const pattern = /[^a-z]/i;
    nameValid = pattern.test(branchName);
  }
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !nameValid && "text-danger"
      }`}
    >
      <label htmlFor="branchName">اسم الفرع</label>
      {/* <br /> */}
      <TextField
        className="mx-3"
        required
        id="branchName"
        placeholder="السويس"
        variant="standard"
        name="email"
        type="text"
        value={branchName}
        onChange={(e) => setBranchName(e.target.value)}
      />
    </div>
  );
};

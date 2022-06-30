import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API_PATH from "../API_PATH";
import { UserContext } from "./../UserProvider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ConfirmMonthCashing from "./ConfirmMonthCashing";
import Button from "@mui/material/Button";
import DeleteProcess from "./DeleteProcess";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import EditProcessMonth from "./../EditProcessMonth/EditProcessMonth";

function Process() {
  const { id } = useParams();
  const { token, isManager, userInfo } = useContext(UserContext);
  const [processMonth, setProcessMonth] = useState([]);
  const [process, setProcess] = useState([]);
  const [paidMonth, setPaidMonth] = useState();
  const [unPaidMonth, setUnPaidMonth] = useState();
  const [isPrinting, setIsPrinting] = useState();
  const bodyRef = document.body;
  const PrintDiv = useRef();

  useEffect(() => {
    if (processMonth) {
      let paidCount = 0;
      let unPaidCount = 0;
      processMonth.map((month) => {
        if (month.is_cashed) {
          paidCount = paidCount + 1;
        } else {
          unPaidCount = unPaidCount + 1;
        }
      });

      setPaidMonth(paidCount);
      setUnPaidMonth(unPaidCount);
    }
  }, [processMonth]);

  useEffect(() => {
    if (token && id) {
      getProcess(id, token);
      getProcessMonths(id, token);
    }
    // eslint-disable-next-line
  }, [id, token]);

  const getProcessMonths = async (id, token) => {
    const url = `${API_PATH}/process/month/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setProcessMonth(data);
    }
  };

  const getProcess = async (id, token) => {
    const url = `${API_PATH}/process/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setProcess(data);
    }
  };

  return (
    <div
      className={`text-decoration-none mx-2 w-100 bg-white my-4 rounded shadow-lg p-4 d-flex justify-content-between align-items-center`}
    >
      <div className="w-100">
        {process && (
          <>
            <div className="d-flex justify-content-between align-items-center">
              {isManager && (
                <PrintButton
                  body={bodyRef}
                  dataRef={PrintDiv}
                  setIsPrinting={setIsPrinting}
                  isPrinting={isPrinting}
                />
              )}
              <InsurancePaper image={process.insurance_paper} />
              {isPrinting === true ? null : (
                <>{isManager && <DeleteProcess id={process.process_id} />}</>
              )}
            </div>

            <div ref={PrintDiv} className="p-4">
              <p>رقم العملية : {process.process_id}</p>
              <p>اسم العميل : {process.Client && process.Client.client_name}</p>
              <p>اسم المندوب : {process.Sale && process.Sale.sales_name}</p>
              <p>المنتج : {process.Product && process.Product.product_name}</p>
              <p>المقدم : {process.first_price}</p>
              <p>السعر النهائي شامل المقدم : {process.final_price}</p>
              {isPrinting ? (
                <p>تاريخ الوصل {new Date().toLocaleDateString()}</p>
              ) : (
                <>
                  <p>تاريخ أول قسط : {process.first_date}</p>
                  <p>تاريخ أخر قسط : {process.last_date}</p>
                </>
              )}
              <p>عدد الشهور : {processMonth.length}</p>
              <p>عدد الشهور المدفوعة : {paidMonth}</p>
              <p>عدد الشهور المتبقية : {unPaidMonth}</p>
            </div>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="text-primary mx-3 fs-5">
                  عدد الشهور : {process.month_count}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {processMonth &&
                  processMonth.map((month) => (
                    <div
                      key={month.process_month_id}
                      className={`w-100 ${
                        month.is_cashed && "bg-light"
                      } my-3 rounded shadow p-2 d-flex justify-content-between align-items-center`}
                    >
                      <div>
                        <p>الشهر : {month.date}</p>
                        <p>القيمة المستحقة : {month.price}</p>
                        <p>تم الدفع : {month.is_cashed ? "نعم" : "لا"}</p>
                      </div>
                      <div className="p-2 d-flex justify-content-between align-items-center">
                        {
                          isManager && <EditProcessMonth monthInfo={month} />
                        }
                        <ConfirmMonthCashing
                          id={month.process_month_id}
                          role={month.is_cashed ? "uncash" : "cash"}
                        />
                      </div>
                    </div>
                  ))}
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </div>
    </div>
  );
}

const PrintButton = ({ body, dataRef, setIsPrinting, isPrinting }) => {
  const printInsurance = () => {
    setIsPrinting(true);
    const bodyTemp = body.innerHTML;
    body.innerHTML = dataRef.current.innerHTML;
    window.print();
    body.innerHTML = bodyTemp;
    setIsPrinting(false);
  };

  return (
    <Button size="medium" variant="contained" onClick={() => printInsurance()}>
      طباعة
    </Button>
  );
};

const InsurancePaper = ({ image }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };

  return (
    <>
      <Button size="large" color="primary" onClick={handleOpen}>
        عرض صورة الوصل
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            className=" profile-image rounded text-center mx-auto w-100 my-2"
            alt={"صورة الوصل"}
            src={`data:image/png;base64, ${image}`}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Process;

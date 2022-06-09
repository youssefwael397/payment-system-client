import React, { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { UserContext } from './../UserProvider'
import EditBossProfile from './EditBossProfile';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const { isBoss } = useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" size="medium" onClick={handleOpen}>تعديل</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h5 className='text-center'>تعديل الصفحة الشخصية</h5>
                    {
                        isBoss && <EditBossProfile />
                    }
                    {
                        // isManager && EditManagerProfile
                    }
                    {
                        // isSales && EditSalesProfile
                    }

                </Box>
            </Modal>
        </div>
    );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState} from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    height: '100%',
    display: 'block',
    p: 4,
    overflow: 'scroll'
};

export default function CreateGroupModal({users, onHandleGroupCreate}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [groupName, setGroupName] = useState('');


    const PossibleUsers = (users: any) => {
        console.log(users)
        return users.users.map((user: any) => {
            return (<div key={user.username}><label>{user.username} {user._id}</label>
                <input
                    checked={selectedCheckboxes.includes(user._id)}
                    onChange={() => handleCheckboxChange(user.username)} type="checkbox" value={user.username}
                />
            </div>)
        });
    }

    const handleCheckboxChange = (value: any) => {
        console.log(value)
        console.log(selectedCheckboxes)
        // @ts-ignore
        setSelectedCheckboxes((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((item) => item !== value)
                : [...prevSelected, value]
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log the values of selected checkboxes
        console.log('Selected Checkboxes:', selectedCheckboxes);
        console.log(groupName)
        // You can perform further actions here with the selected values
        onHandleGroupCreate({
            name: groupName,
            allowed_users: selectedCheckboxes
        });

    };

    const handleGroupNameChange = (event: any) => {
        const {value} = event.target;

        setGroupName(value);
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form method="post" onSubmit={handleSubmit}>
                        <h2>Create group</h2>
                        <div className="form-control">
                            <label>Group name</label>
                            <input
                                type="text"
                                name="name"
                                value={groupName}
                                onChange={handleGroupNameChange}
                            />
                        </div>
                        <div className="form-control">
                            <PossibleUsers users={users}></PossibleUsers>
                        </div>
                        <div className="form-control">
                            <input type="submit" value="Create"/>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

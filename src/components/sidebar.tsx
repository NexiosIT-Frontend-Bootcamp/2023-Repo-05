import CreateGroupModal from "./CreateGroupModal";

const Sidebar = ({users, createGroup}) => {
    return (
        <div>
            <CreateGroupModal users={users} onHandleGroupCreate={createGroup}></CreateGroupModal>
        </div>
    );
}

export default Sidebar;

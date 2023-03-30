import React, { useState, useEffect } from "react";
import "./tables.css";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { getAllUser, deleteuser } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import UpdateUser from "./UpdateUser";
import { useAlert } from "react-alert";


const UsersList = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const { users, error, isDeleted } = useSelector((state) => state.user);
  const [pencil, setPencil] = useState(false);
  const [puser, setPuser] = useState();
  const onChangePencilHandler = (i) => {
    setPencil(true);
    setPuser(i);
  };

  const onDeleteHandler = (i) => {
    dispatch(deleteuser(i._id));
  };

  useEffect(() => {
    if(isDeleted){
      alert.success("User deleted successfully!")
    }
    if(error){
      alert.error(error);
    }
    dispatch({type:"deleteUserReset"})
  }, [dispatch, isDeleted, error, alert])
  

  const togglePencilHandler = () => setPencil(false);
  return (
    <>
      {!pencil ? (
        <div className="tableContainer">
          <div className="table-box">
            <h1>ALL USERS</h1>
            <table>
              <tbody>
                <tr>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </tbody>
              <tbody>
                {users.map((i) => (
                  <tr>
                    <td>{i._id}</td>
                    <td>{i.email}</td>
                    <td>{i.name}</td>
                    <td style={{color: i.role==="admin" ? 'orange': 'red'}}>{i.role.charAt(0).toUpperCase() + i.role.slice(1)}</td>
                    <td>
                      <span className="tableIcons">
                        <BsPencilFill
                          style={{ fontSize: "1.8rem" }}
                          onClick={() => onChangePencilHandler(i)}
                        />
                      </span>
                      <span className="tableIcons">
                        <BsTrash
                          style={{ fontSize: "1.8rem" }}
                          onClick={() => onDeleteHandler(i)}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <UpdateUser
          id={puser._id}
          name={puser.name}
          email={puser.email}
          role={puser.role}
          togglePencil = {togglePencilHandler}
        />
      )}
    </>
  );
};

export default UsersList;

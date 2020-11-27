import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const AdminPage = () => {
  const [userlist, setUserlist] = useState([]);

  const handleAllow = (id) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:9000/api/users/allowLogin/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        NotificationManager.success(res.data.msg);
        let tempArr = [...userlist];
        tempArr[tempArr.findIndex((el) => el._id === res.data.user._id)] =
          res.data.user;
        setUserlist([...tempArr]);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.msg);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:9000/api/users/userlist", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        res.data.userlist.sort((a, b) => a.canLogin - b.canLogin);
        setUserlist([...res.data.userlist]);
      });
  }, []);

  console.log(userlist);

  return (
    <>
      <NotificationContainer />
      <h1 className="text-center pt-4">Admin Page</h1>
      <div className="p-4">
        <MDBTable className="py-3" hover>
          <MDBTableHead color="primary-color" textWhite>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permissions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {userlist &&
              userlist.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.canLogin ? (
                      "Already allowed"
                    ) : (
                      <MDBBtn
                        color="dark"
                        size="sm"
                        onClick={() => handleAllow(user._id)}
                      >
                        Allow
                      </MDBBtn>
                    )}
                  </td>
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </>
  );
};

export default AdminPage;

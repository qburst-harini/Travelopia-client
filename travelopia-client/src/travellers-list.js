import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TravellersList = () => {
  let navigate = useNavigate();
  const [list, setList] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users`)
      .then((res) => setList(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  const tableHeaders = {
    Name: "name",
    Email: "email",
    City: "city",
    Number_of_Travellers: "travelNumbers",
    Price: "dollars",
  };
  return (
    <>
      {list?.length ? (
        <table className="travellers-list">
          <thead>
            <tr>
              {Object.keys(tableHeaders).map((item, idx) => {
                return (
                  <th key={`item-${idx}`} id={idx}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {list.map((val, idx) => {
              return (
                <tr key={`row-${idx}`}>
                  {Object.values(tableHeaders).map((h, idx) => {
                    const value = h === "dollars" ? `$${val[h]}` : `${val[h]}`;
                    return <td key={`${idx}`}>{value}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h3>Loading...</h3>
      )}
      <button onClick={() => navigate("/")} className="add-button">
        Add Travellers
      </button>
    </>
  );
};

export default TravellersList;

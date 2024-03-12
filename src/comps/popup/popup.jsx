import styles from "./popup.module.css";
import NavBar from "../navbar/navbar.jsx";
import Button from "../button/button.jsx";
import Dropdown from "../dropdown.js";
import { useState } from "react";
import axios from "axios";

export default function Popup(props) {
  let deletedIndex;
  const [select, setSelected] = useState("Add schema to segment");
  const [inputSegment, setInputSegment] = useState("");
  const [dd, setDD] = useState([]);

  function handleSelect(label, value) {
    setSelected(label);
  }

  function addDropdown() {
    let selectedIndex;

    if (select !== "Add schema to segment") {
      alert(select)
      setDD((prev) => [...prev, select]);
      setSelected("Add schema to segment");
    }

    let copyOfDD = [...dd, select];

    copyOfDD.map((vali, i) => {
      selectedIndex = filterOptions.filter((valj, pos) => {
        return vali !== valj.label;
      });
    });

    setFilterOptions([...selectedIndex]);
    // alert(JSON.stringify(selectedIndex));
  }

  function remove(index) {
    deletedIndex = dd.filter((val, pos) => {
      return pos !== index;
    });
    setDD([...deletedIndex]);
  }

  function sendSegment() {
    let schema = {};
    dd.map((val, i) => {
      let value = document.getElementById("sub" + i).innerText;
      let key = value.toLowerCase().split(" ").join("_");
      schema[key] = value;
    });

    let data = JSON.stringify({ segment_name: inputSegment, schema: [schema] });

    axios({
      url: "https://webhook.site/e537899b-34d3-4ca6-b625-731de495c1a9",
      method: "POST",

      data: data,
    })
      .then((res) => {
        alert(res);
      })
      .catch((err) => {
        if (err.request.status == 0 || err.request.status == 200)
          alert(`Data Sent Successfully
        ${data}`);
        else alert(err);
      });
  }

  let options = [
    { value: "first_name", label: "First Name" },
    { value: "last_name", label: "Last Name" },
    { value: "gender", label: "Gender" },
    { value: "age", label: "Age" },
    { value: "account_name", label: "Account Name" },
    { value: "city", label: "City" },
    { value: "state", label: "State" },
  ];
  const [filterOptions, setFilterOptions] = useState(options);

  return (
    <div className={styles.win}>
      <NavBar title={"Saving Segment"} />

      <div className={styles.form}>
        <label>Enter the name of the segment</label>
        <input
          type="text"
          placeholder="Name of the segment"
          onChange={(e) => setInputSegment(e.target.value)}
        />
        <br />
        <br />
        <label>
          To save your segment, you need to add the schemas to build the query
        </label>

        <div>
          {dd.map((val, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-evenly",
                  width: "85%",
                  gap: "0.5rem",
                }}
              >
                <Dropdown
                  idValue={"sub" + i}
                  handleSelect={handleSelect}
                  placeholder={val}
                  options={options}
                />
                <button
                  onClick={() => remove(i)}
                  style={{
                    background: "#f2fbf9",
                    color: "#657a93",
                    border: "none",
                    outline: "none",
                    width: "50px",
                    height: "55px",
                    fontSize: "40px",
                  }}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ width: "89%" }}>
          <Dropdown
            options={filterOptions}
            idValue="main"
            handleSelect={handleSelect}
            placeholder={select}
          />
          <button className={styles.link} onClick={addDropdown}>
            + <u>Add new schema</u>
          </button>
        </div>

        <Button name={"Save Changes"} click={sendSegment} />
        {"  "}
        <Button name={"Cancel"} click={props.click} />
      </div>
    </div>
  );
}

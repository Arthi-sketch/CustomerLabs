import { useState } from "react";
import Button from "../button/button.jsx";
import styles from "./info.module.css";
import Popup from "../popup/popup.jsx";

export default function Info() {
  const [win, setWin] = useState(false);
  const [blur, setBlur] = useState(" blur(0px)");
  
  const style = {
    filter: blur,
  };

  function popup(val) {
    setWin(val);
    val===true ? setBlur(" blur(5px)") : setBlur(" blur(0px)")
  }
  return (
    <div className={styles.info}>
      <div style={style}>
        <p>
          Generate Lorem Ipsum placeholder text for use in your graphic, print
          and web layouts, and discover plugins for your favorite writing,
          design and blogging tools.
        </p>
        <Button name={"Save The Segment"} click={popup} />
      </div>
      {win && <Popup click={popup}/>}
    </div>
  );
}

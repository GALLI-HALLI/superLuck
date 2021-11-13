import React from "react";
import "../../pages/MyInfo.scss";
import userSectionStyle from "./MyInfoHeaderDisplay.module.scss"

const MyInfoHeaderDisplay = () => {

  const userInfo = {
    nickName: "답수",
    achievementTitle: "위대한 패배자",
  }

  return (
    <div className={userSectionStyle.display}>
      <div className={userSectionStyle.wrap}>
        <img
          src="https://yt3.ggpht.com/ytc/AKedOLSAjLrkn8vs3X-ktbZcLCFw1iSwBVgY1otbTAse=s900-c-k-c0x00ffffff-no-rj"
          alt="Example Character"
          className={userSectionStyle.character}
        ></img>
        <div className={userSectionStyle.nameAndTitle}>
          <h2>{userInfo.nickName}</h2>
          <p>{userInfo.achievementTitle}</p>
        </div>
      </div>
      <button className={userSectionStyle.btn}>정보 수정</button>
    </div>
  );
};

export default MyInfoHeaderDisplay;
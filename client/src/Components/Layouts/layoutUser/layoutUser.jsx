import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind"
import styles from "../layoutUser/layoutUser.module.scss";

const cx = classNames.bind(styles)

const User = () => {
    return <>
   
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('sidebar')}>  this Sidebar page   </div>
        <div className={cx('content')}>  this Content page   </div>

      </div>
    </div>
    </>;
  }
  
  export default User;
  
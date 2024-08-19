import React, { useState } from 'react';
import styles from './Dashboard.module.scss';
import logo from './logo512.png'

const Dashboard = () => {
    const [page, setPage]= useState(0)
    return (
        <div className={styles.dashboard}>
            <div className={styles.Khung}>
                <div className={styles.footer}>
                    <img className={styles.avatar} src={logo}>
                    </img>
                    <img className={styles.arrow} width="20" height="20" src="https://img.icons8.com/ultraviolet/40/expand-arrow--v1.png" alt="expand-arrow--v1"/>
                </div>
                <div className={styles.main}>
                    <div className={styles.menu}>
                        <ul>
                            {page == 1 ?<li onClick={()=>{setPage((e)=>e = 0)}} className={styles.active}>Dashboard</li>:<li onClick={()=>{setPage((e)=>e = 1)}}>Dashboard</li>}
                            {page == 2 ?<li className={styles.active} onClick={()=>{setPage((e)=>e = 0)}} >Profile</li>:<li onClick={()=>{setPage((e)=>e = 2)}}>Profile</li>}
                            {page == 3 ?<li className={styles.active} onClick={()=>{setPage((e)=>e = 0)}} >Classes</li>:<li onClick={()=>{setPage((e)=>e = 3)}}>Classes</li>}
                            {page == 4 ?<li className={styles.active} onClick={()=>{setPage((e)=>e = 0)}} >Students</li>:<li onClick={()=>{setPage((e)=>e = 4)}}>Students</li>}
                            {page == 5 ?<li className={styles.active} onClick={()=>{setPage((e)=>e = 0)}} >Tests</li>:<li onClick={()=>{setPage((e)=>e = 5)}}>Tests</li>}
                            {page == 6?<li className={styles.active} onClick={()=>{setPage((e)=>e = 0)}} >Question</li>:<li onClick={()=>{setPage((e)=>e = 6)}}>Question</li>}
                            {page == 7 ?<li className={styles.active} onClick={()=>{setPage((e)=>e = 0)}} >Scores</li>:<li onClick={()=>{setPage((e)=>e = 7)}}>Scores</li>}
                            {page == 8 ?<li className={styles.active} onClick={()=>{setPage((e)=>e = 0)}} >Sign Out</li>:<li onClick={()=>{setPage((e)=>e = 8)}}>Sign Out</li>}
                            
                        </ul>
                    </div>
                    <div className={styles.mainshow}>
                        {page == 1?<p>Dashboard</p>:null}
                        {page == 2?<p>Profile</p>:null}
                        {page == 3?<p>Classes</p>:null}
                        {page == 4?<p>Students</p>:null}
                        {page == 5?<p>Tests</p>:null}
                        {page == 6?<p>Question</p>:null}
                        {page == 7?<p>Scores</p>:null}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React from 'react';
import Link from 'next/link';

const Admin = ({page}) => {
    const menu = [
        {
            name:"Calendar", 
            link: "/calendar"
        },
        {
            name: "Orders",
            link: "/orders",
        },
        {
            name: "Total", 
            link: "/total", 
        },
        ]
    return (
        <React.Fragment>
            <div className="admin-panel">
                <div className="dasboard-title">
                    <img src={'/img/cursive-logo-V.png'} alt="" className="side-logo" />
                    <Link href="/">
                    <h4 style={{cursor: 'default'}}>Unzipped </h4>
                    </Link>
                </div>
                <div className="menu-items">
                    <div className="dashboard-title">
                        <p id="title-one">Dashboard</p>
                    </div>
                    {menu.map((item, index) => {
                        return (
                            <Link href={`/dashboard/hotel${item.link}`} key={index}>
                                <div className={index !== page ? "item-outer-container" : "item-outer-container-2"}>
                                    <div className="item-container" key={index}>
                                        {/* icon */}
                                        <p style={{cursor: 'default'}}>{item.name}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Admin;
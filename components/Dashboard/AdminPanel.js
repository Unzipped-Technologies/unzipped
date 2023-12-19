import React from 'react';
import Link from 'next/link';

const Admin = ({page}) => {
    const menu = [
        {
            name: "Customers", 
            link: "/customers", 
        },
        {
            name: "Orders",
            link: "/orders",
        },
        {
            name: "Promos", 
            link: "/promos", 
        },
        {
            name: "Admin", 
            link: "/admin", 
        },
        ]
    return (
        <React.Fragment>
            <div className="admin-panel">
                <div className="dasboard-title">
                    <Link href="/"> 
                    <img src={'/img/Unzipped-Primary-Logo.png'} alt="" className="side-logo" />
                    </Link>
                </div>
                <div className="menu-items">
                    <div className="dashboard-title">
                        <p id="title-one">Dashboard</p>
                    </div>
                    {menu.map((item, index) => {
                        return (
                            <Link href={`/dashboard${item.link}`} key={index}>
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
import React from 'react';

const Dropdown = ({MenuItems, signOut}) => {

    return (
        <React.Fragment>
            <div  >
                <ul className="nav-text-right">
                    {MenuItems.map((item, index) => (
                        <li key={index} className={item !== "<hr />" ? "menu-item-comp" : "line-div-comp"}>
                            {item.names === "<hr />" &&
                                <hr className="line-div words-nav"/> 
                            }
                            {item.names !== "<hr />" &&
                                <>
                                {item.names !== 'Sign out' &&
                                    <a href={item.links} className="link-styleless">
                                    <span className="words-nav" >{item.names}</span> 
                                    </a>
                                }
                                {item.names === 'Sign out' &&
                                    <button onClick={() => signOut()} className="link-styleless" id="menu-signout">
                                    <span className="words-nav" >{item.names}</span> 
                                    </button>
                                }
                                </>
                            }    

                        </li>
                    ))}
                    <div className="blank-space"></div>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Dropdown;
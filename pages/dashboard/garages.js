import React, {useEffect, useState, useRef} from 'react';
import Admin from '../../components/Dashboard/AdminPanel';
import Nav from '../../components/Dashboard/AdminNav';
import { parseCookies } from "../../services/cookieHelper";
import { connect, useDispatch } from 'react-redux';
import { getGarages, loadMoreCustomers, addCustomer } from '../../redux/actions';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleBar from 'simplebar-react';
import AddGarage from "../../components/modals/addGarage";
import DeleteGarages from "../../components/modals/deleteGarages";
import EditCustomer from "../../components/modals/editCustomer";
import 'simplebar/dist/simplebar.min.css';

const Customers = ({garages, token, cookies, userType, loading}) => {
    const [indeterminate, setIndeterminate] = useState(false);
    const [checked, setChecked] = useState([]);
    const [pages, setPages] = useState(0);
    const [checkAll, setCheckAll] = useState(false);
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deletes, setDeletes] = useState([]);
    const [edits, setEdits] = useState([]);
    const [access, setAccess] = useState('');
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setFocus(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const deleteSelected = () => {
        let list = checked.filter(x=> x.checked !== false); 
        setDeletes(list);
        setDeleteOpen(true);
    };

    const editSelected = () => {
        let list = checked.filter(x=> x.checked !== false); 
        setEdits(list);
        setEditOpen(true);
    }

    const moreBtn = [
        {
            name: 'Add Garage',
            function: () => setOpen(true)
        },
        {
            name: 'Delete Garage',
            function: () => deleteSelected()
        },
    ]
    const dispatch = useDispatch();


    const handleChange = (index) => {
        let update = checked.find(x=> x._id === checked[index]._id); 
        let list = checked.filter(x=> x._id !== checked[index]._id); 
        update.checked = !update.checked
        let start = index;
        let deleteCount = 0;
        list.splice(start, deleteCount, update);
        // temporarychecked[index][whichvalue] = true;
        // console.log(temporarychecked)
        setChecked([...list]);
      };

    const checkAllUsers = () => {
        setCheckAll(!checkAll);
        let checked = garages.map(item => ({...item, checked: !checkAll}))
        setChecked(checked);
    }

    const grabChecked = () => {
        let checked = garages.map(item => ({...item, checked: false}))
        setChecked(checked);
    }

    const loadMoreUsers = () => {
        let number = pages + 1;
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        setPages(number)
        dispatch(loadMoreCustomers(number, cookie))
    }

    useEffect(() => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        dispatch(getGarages(0, cookie))
    }, [])

    useEffect(() => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        setAccess(cookie);
    }, [token, cookies])

    useEffect(() => {
        grabChecked()
    }, [garages])


    return (
        <React.Fragment>
            <div className="main-dashboard">
                <Admin page={3}/>
                <div className="right-dashboard">
                    <Nav/>
                    <div className="dashboard-main">
                        <div className="dashboard-card">
                            <div className="card-title" id="promo-title">
                                <h4 className="mobile-dashboard-title" id="customer-dash">Garages</h4>
                                <div className="button-mobile-mover">
                                    <AddGarage open={open} setOpen={setOpen} token={access}/>
                                    <DeleteGarages open={deleteOpen} setOpen={setDeleteOpen} token={access} deletes={deletes}/>
                                    <EditCustomer open={editOpen} setOpen={setEditOpen} token={access} edits={edits[0]}/>
                                    <button className="filter-btn"><i className="fa fa-filter" style={{fontStyle: 'normal', marginRight: '3px'}}/>Filter</button>
                                    <button className="customer-btn" onClick={() => setOpen(true)}><i className="fa fa-plus" style={{fontStyle: 'normal', marginRight: '7px', color: '#fff', fontWeight: '200'}}/>Add garage</button>
                                    <button className="customer-btn" onClick={() => setFocus('more')} id="more-btn">
                                        More<i className="fa fa-angle-down" style={{fontStyle: 'normal', marginLeft: '5px', color: '#000'}}/>
                                        {focus === "more" && 
                                            <div className="more-box-1" ref={wrapperRef}>
                                                {moreBtn.map((item, index) => {
                                                    return (
                                                        <div className="menu-items-customer" onClick={item.function} key={index}>
                                                            <p className="del-add-text">{item.name}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="row-box-customer">
                                <div className="first-row">
                                    <div className="first-row">
                                        <div className="left-box" id="email-title-customer">
                                            <Checkbox
                                                color="primary"
                                                checked={checkAll}
                                                onClick={() => checkAllUsers()}
                                                name="All"
                                                
                                            />
                                            <p className="email-customer bold" >NAME</p>
                                        </div>
                                        <p className="description-customer bold">ADDRESS</p>
                                    </div>
                                    {/* <div className="first-row column-two-customer bold">
                                        <p id="move-text-type">USER TYPE</p>
                                        <p id="move-text-customer">CREATED</p>
                                    </div> */}
                                </div>
                            <div style={{height: '530px'}}>
                            {userType !== 'Admin' &&
                                <p>Login as admin to continue...</p>
                            }
                            {userType === 'Admin' &&
                            <>
                            <SimpleBar className="simple-Bar-5" style={{ height: '530px', width: '99%' }}>
                            {loading &&
                                <CircularProgress size={22}/>
                            }
                            {checked.map((item, index) => {
                                return (
                                    <div key={index} className="user-rows">
                                        <div className="first-row" id="garage-row-one">
                                        <div className="left-box">
                                            <Checkbox
                                                color="primary"
                                                checked={item.checked}
                                                onClick={(e) => handleChange(index)}
                                                name={item._id}
                                            />
                                        <p className="email-customer" id="name-garage-1" style={{width: '230px'}}>{item.name}</p>
                                        </div>
                                        <p className="description-customer" id="address-garage-1" style={{width: '280px', textAlign: 'left'}}>{item.address}</p>
                                        </div>
                                        {/* <div className="first-row column-two-customer">
                                            <p></p>
                                            <p>{item.dateCreated.substring(0,15)}</p>
                                        </div> */}
                                    </div>
                                )
                            })}
                            <div className="user-rows" id="see-more-1">
                                <div className="first-row" id="see-more">
                                <button className="see-more-customer" onClick={() => loadMoreUsers()}>{loading ? <CircularProgress size={18}/> : 'See More...'}</button>
                                </div>
                            </div>
                            </SimpleBar>
                            </>
                            }
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

Customers.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)

      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        garages: state.Dashboard.garages.reverse(),
        cookies: state.Auth.token,
        loading: state.Dashboard.loading,
        userType: state.Auth.user.userType
    }
}

export default connect(mapStateToProps, {getGarages, loadMoreCustomers, addCustomer})(Customers);
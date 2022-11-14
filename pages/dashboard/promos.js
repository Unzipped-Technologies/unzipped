import React, {useState, useEffect, useRef, useCallback} from 'react';
import Admin from '../../components/Dashboard/AdminPanel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Nav from '../../components/Dashboard/AdminNav';
import { connect, useDispatch } from 'react-redux';
import { parseCookies } from "../../services/cookieHelper";
import SimpleBar from 'simplebar-react';
import { getMorePromos, getPromos } from '../../redux/actions';
import AddPromos from '../../components/modals/addPromos';
import DeletePromos from '../../components/modals/deletePromo';
import 'simplebar/dist/simplebar.min.css';

const Dashboard = ({token, cookies, loading, hasMorePromos, promos, userType}) => {
    const [indeterminate, setIndeterminate] = useState(false);
    const [checked, setChecked] = useState([]);
    const [pages, setPages] = useState(0);
    const [checkAll, setCheckAll] = useState(false);
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [cookiea, setCookiea] = useState('');
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deletes, setDeletes] = useState([]);
    const [edits, setEdits] = useState([]);
    const [access, setAccess] = useState('');
    const wrapperRef = useRef(null);
    const observer = useRef(null);
    const lastOrderRef = useCallback(node => {
        if (hasMorePromos) {
            if (loading) return;
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    loadMorePromos()
                }
            })
            if (node) observer.current.observe(node)
            console.log('print More')
        }
    }, [loading])

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
        console.log(list[0])
        setEdits(list);
        setEditOpen(true);
    }

    const moreBtn = [
        {
            name: 'Add Promo',
            function: () => setOpen(true)
        },
        {
            name: 'Delete Promo',
            function: () => deleteSelected()
        }
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
        const checked = promos.map(item => ({...item, checked: !checkAll}))
        setChecked(checked);
    }

    const grabChecked = () => {
        const checked = promos.map(item => ({...item, checked: false}))
        setChecked(checked);
    }

    const loadMorePromos = () => {
        let number = pages + 1;
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        setPages(number)
        dispatch(getMorePromos(number, cookie))
    }

    useEffect(() => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        setCookiea(cookie);
        dispatch(getPromos(0, cookie));
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
    }, [promos])


    return (
        <React.Fragment>
            <div className="main-dashboard">
                <Admin page={4} />
                <div className="right-dashboard">
                    <Nav/>
                    <div className="dashboard-main">
                        <div className="dashboard-card">
                            <div className="card-title" id="promo-title">
                                <h4 className="mobile-dashboard-title" id="customer-dash">Promos</h4>
                                <div className="button-mobile-mover">
                                    <AddPromos open={open} setOpen={setOpen} token={cookiea} promos={promos}/>
                                    <DeletePromos open={deleteOpen} setOpen={setDeleteOpen} token={cookiea} deletes={deletes}/>
                                    <button className="filter-btn"><i className="fa fa-filter" style={{fontStyle: 'normal', marginRight: '3px'}}/>Filter</button>
                                    <button className="customer-btn" onClick={() => setOpen(true)}><i className="fa fa-plus" style={{fontStyle: 'normal', marginRight: '7px', color: '#fff', fontWeight: '200'}}/>Add promo</button>
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
                                <div className="first-row" id="header-row-promo">
                                    <div className="first-row">
                                        <div className="left-box title-box-promo" id="promo-left-box">
                                            <Checkbox
                                                color="primary"
                                                checked={checkAll}
                                                onClick={() => checkAllUsers()}
                                                name="All"
                                                
                                            />
                                            <p className="email-customer bold promo-width-mobile" >CODE</p>
                                        </div>
                                        <p className="description-customer bold promo-mobile">DESCRIPTION</p>
                                    </div>
                                    <div className="first-row column-two-customer bold" id="second-row">
                                        <p id="move-text-type" className="discountamt">DISCOUNT</p>
                                        <p id="move-text-customer" className="promo-role" >REQUIRED ROLE</p>
                                    </div>
                                </div>
                            <div style={{height: '530px'}}>
                            {userType !== 'Admin' &&
                                <p>Login as admin to continue...</p>
                            }
                            {userType === 'Admin' &&
                            <>
                            <SimpleBar className="simple-Bar-5"  style={{ height: '530px', width: '99%' }}>
                            {loading &&
                                <CircularProgress size={22}/>
                            }
                            {checked.map((item, index) => {
                                return (
                                    <div key={index} className="user-rows" id="header-row-promo-1">
                                        <div className="first-row left-row-1">
                                        <div className="left-box" id="promo-left-box">
                                            <Checkbox
                                                color="primary"
                                                checked={item.checked}
                                                onClick={(e) => handleChange(index)}
                                                name={item._id}
                                            />
                                        <p className="email-customer promo-width-mobile">{item.code}</p>
                                        </div>
                                        <p className="description-customer promo-mobile">{item.description}</p>
                                        </div>
                                        <div className="first-row column-two-customer" id="second-row">
                                            <p className="mobile-promo-code">{((1 - item.discount) * 100).toFixed(0)}% off</p>
                                            <p className="promo-role">{item.userType}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="user-rows" id="see-more-1">
                                <div className="first-row" id="see-more">
                                {hasMorePromos &&
                                <>
                                {promos.length > 0 &&
                                    <button className="see-more-customer" ref={lastOrderRef} onClick={() => loadMorePromos()}>{loading ? <CircularProgress size={18}/> : 'See More...'}</button>
                                }
                                </>
                                }
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

Dashboard.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)

      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        cookies: state.Auth.token,
        loading: state.Dashboard.loading,
        hasMorePromos: state.Dashboard.hasMorePromos,
        promos: state.Dashboard.promos.reverse(),
        userType: state.Auth.user.userType
    }
}

export default connect(mapStateToProps, { getMorePromos, getPromos })(Dashboard);

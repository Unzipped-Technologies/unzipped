import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Nav from '../../../../components/unzipped/header';
import Invoice from "../../../../components/unzipped/dashboard/project/invoice";
import Templates from "../../../../components/unzipped/dashboard/project/templates";
import { useRouter } from 'next/router';
import { addTaskAndAddToTaskHours, getBusinessTasksByInvestor, updateTaskDate, updateTaskHours, updateTaskHoursStatus } from "../../../../redux/actions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { accountTypeEnum } from '../../../../server/enum/accountTypeEnum';

const Desktop = styled.div`
@media(max-width: 680px) {
    display: none;
}
`
const MobileDisplayBox = styled.div`
    @media(min-width: 680px) {
        display: none;
    }
`;

const YourComponent = ({ _id, projectName, invoiceTags, invoiceTaskHours, access_token, getBusinessTasksByInvestor, updateTaskDate, updateTaskHours, updateTaskHoursStatus, addTaskAndAddToTaskHours }) => {
  const router = useRouter();

  const { id } = router.query;

  const [showInvoice, setShowInvoice] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState({})
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [weekOptions, setWeekOptions] = useState([]);
  const [take, setTake] = useState(25);
  const [searchFilter, setSearchFilter] = useState('');
  const [startDate, setStartDate] = useState();

  useMemo(() => {
    if (id !== undefined) {
      getBusinessTasksByInvestor({ businessId: id, access_token })
    }
  }, [id, showInvoice])

  useEffect(() => {
    setData(invoiceTaskHours)
  }, [invoiceTaskHours])

  useEffect(() => {
    const options = [];
    const currentDate = new Date();
    for (let i = 10; i >= 0; i--) {
      const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() - i * 7);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      options.unshift({ startOfWeek, endOfWeek });
    }
    setWeekOptions(options);
    setSelectedWeek(0);
  }, []);

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined) {
      const filteredItems = data.filter((item) => {
        const itemDate = new Date(item.updatedAt);
        const startOfWeek = weekOptions[selectedWeek].startOfWeek;
        const endOfWeek = weekOptions[selectedWeek].endOfWeek;
        setStartDate(startOfWeek);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      });
      setFilteredData(filteredItems);
    }
  }, [selectedWeek, data, weekOptions]);

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && filteredData !== null) {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const organizedItems = Object.fromEntries(daysOfWeek.map(day => [day, []]));
      filteredData.forEach((item) => {
        const itemDate = new Date(item.updatedAt);
        const dayOfWeek = daysOfWeek[itemDate.getDay()];
        organizedItems[dayOfWeek].push(item);
      });
      setSortedData(organizedItems)
    }
  }, [selectedWeek, filteredData]);

  const handleWeekChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedWeek(selectedIndex);
  };

  const handletake = (value) => {
    setTake(value)
  }

  const handleFilter = (value) => {
    setSearchFilter(value)
  }

  const handleShowInvoice = (value) => {
    setShowInvoice(value)
  }

  return (
    <>
      <Nav isSubMenu marginBottom={'160px'} />
      <Desktop>
        {showInvoice ? <Invoice weekOptions={weekOptions} handleWeekChange={handleWeekChange} sortedData={sortedData} projectName={projectName} handletake={handletake} take={take} handleFilter={handleFilter} userType={accountTypeEnum.FREELANCER}/>
          : <Templates id={_id} startDate={startDate} weekOptions={weekOptions} invoiceTags={invoiceTags} handleWeekChange={handleWeekChange} sortedData={sortedData} projectName={projectName} handleShowInvoice={(value) => { handleShowInvoice(value) }} handleUpdatedAt={(tasks) => updateTaskDate(tasks, access_token)} handleHours={(hours) => { updateTaskHours(hours, access_token) }} handleTaskStatus={(status) => { updateTaskHoursStatus(status, access_token) }} createTaskAndAddToTaskHours={(task) => { addTaskAndAddToTaskHours(task, access_token) }} />}
      </Desktop>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    _id: state.Auth.user._id,
    access_token: state.Auth.token,
    loading: state.Business?.loading,
    role: state.Auth.user.role,
    cookie: state.Auth.token,
    invoiceTags: state.Business.invoiceTags,
    invoiceTaskHours: state.Business.invoiceTaskHours,
    projectName: state.Business.projectName,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessTasksByInvestor: bindActionCreators(getBusinessTasksByInvestor, dispatch),
    updateTaskDate: bindActionCreators(updateTaskDate, dispatch),
    updateTaskHours: bindActionCreators(updateTaskHours, dispatch),
    updateTaskHoursStatus: bindActionCreators(updateTaskHoursStatus, dispatch),
    addTaskAndAddToTaskHours: bindActionCreators(addTaskAndAddToTaskHours, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourComponent);
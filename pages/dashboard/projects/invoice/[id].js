import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Nav from '../../../../components/unzipped/header';
import Invoice from "../../../../components/unzipped/dashboard/project/invoice";
import Templates from "../../../../components/unzipped/dashboard/project/templates";

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

const YourComponent = () => {
  const [data, setData] = useState([
    {
      "_id": "651f1ccebbae1676488a7e4duyt",
      "updatedAt": "2023-10-28T03:17:14.173Z",
      "name": "a",
      "hours": 4,
      'rate': 45,
      
    },
    {
      "_id": "6530ee98272b3b2e78f5f2e0",
      "name": "b",
      "updatedAt": "2023-10-19T08:53:44.224Z",
      "hours": 4,
      
      'rate': 45,
    },
    {
      "_id": "651f1ccebbae1676488a7e4",
      "name": "c",
      "hours": 4,
      'rate': 45,
      "updatedAt": "2023-10-22T03:17:14.173Z"
    },
    {
      "_id": "6530ee98272b3b2e78f5f0zxcvb",
      "name": "d",
      "hours": 4,
      'rate': 45,
      "updatedAt": "2023-10-23T08:53:44.224Z"
    }, {
      "_id": "651f1ccebbae1676a7e4d",
      "name": "e",
      "hours": 4,
      'rate': 45,
      "updatedAt": "2023-10-23T03:17:14.173Z"
    },
    {
      "_id": "6530ee98272b3b2e78f5f2e0f",
      "name": "f",
      "hours": 4,
      'rate': 45,
      "updatedAt": "2023-10-24T08:53:44.224Z"
    }, {
      "_id": "651f1ccebb76488a7e4d",
      "name": "g",
      "hours": 4,
      'rate': 45,
      "updatedAt": "2023-10-01T03:17:14.173Z"
    },
    {
      "_id": "6530ee98272b3b2e78f5f2dddde0qwert",
      "name": "h",
      "hours": 4,
      'rate': 45,
      "updatedAt": "2023-10-19T21:58:21.832+00:00"
    },
  ]);

  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState({})
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [weekOptions, setWeekOptions] = useState([]);
  const [take, setTake] = useState(25);
  const [searchFilter, setSearchFilter] = useState('');
  const [showInvoice, setShowInvoice] = useState(true)
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
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      });
      setFilteredData(filteredItems);
    }
  }, [selectedWeek, data, weekOptions]);

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && filteredData !== null) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
        {showInvoice ? <Invoice weekOptions={weekOptions} handleWeekChange={handleWeekChange} sortedData={sortedData} projectName={'Build a self flying'} handletake={handletake} take={take} handleFilter={handleFilter} />
          : <Templates weekOptions={weekOptions} handleWeekChange={handleWeekChange} sortedData={sortedData} projectName={'Build a self flying'} handleShowInvoice={(value) => { handleShowInvoice(value) }} />}
      </Desktop>
    </>
  );
};

export default YourComponent;

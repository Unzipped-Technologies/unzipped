import React, {Component} from 'react';
import {Button, Checkbox as CBox} from 'react-bootstrap';
import {FundUtils, SortUtils} from 'utils';

var _ = require('lodash');
class MultiSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropDownOpen: false,
            getCategoriesList: [],
            investorHavingNoContact: false,
        };
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleMenuClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMenuClick, false);
    }

    handleMenuClick = e => {
        if (this.state.dropDownOpen) {
            if (e.target.className.indexOf('dropdownMultiSelect') === -1) {
                this.setState(
                    {
                        dropDownOpen: false,
                    },
                    () => {
                        if (!this.props.isContactForm) {
                            this.updateProps();
                        }
                    },
                );
            }
        }
    };

    componentDidUpdate(nextProps) {
        if (nextProps.categories.length > 0 && !this.props.isMultiSelectUpdated) {
            let contactCategoriesList = nextProps.dropdownSelectedList
                ? _.cloneDeep(nextProps.dropdownSelectedList)
                : [];
            let categories = _.cloneDeep(nextProps.categories);
            if (contactCategoriesList && contactCategoriesList.length > 0) {
                let selectedList = [];
                for (let index of contactCategoriesList) {
                    selectedList.push(index.fundCategoryId ? index.fundCategoryId : index);
                }
                for (let index of categories) {
                    if (selectedList.includes(index.id)) {
                        index['checked'] = true;
                    }
                }
            }
            this.setState(
                {
                    getCategoriesList: categories ? categories : [],
                },
                () => {
                    this.props.updateMultiSelectVal(true);
                },
            );
        }

        if (nextProps.categories.length === 0 && this.props.noCategories) {
            this.setState(
                {
                    getCategoriesList: [],
                },
                () => {
                    this.props.updateNoCategories(true);
                },
            );
        }
    }

    handleClick = () => {
        if (!this.state.dropDownOpen) {
            this.setState({
                dropDownOpen: true,
            });
        } else {
            this.setState(
                {
                    dropDownOpen: false,
                },
                () => {
                    if (!this.props.isContactForm) {
                        this.updateProps();
                    }
                },
            );
        }
    };

    closeMultiSelect = () => {
        this.setState({dropDownOpen: false}, () => {
            this.updateProps();
        });
    };

    updateProps = () => {
        this.props.getUpdatedCategoryList({
            categoryList: _.cloneDeep(this.state.getCategoriesList),
            investorHavingNoContact: this.state.investorHavingNoContact,
        });
    };

    updateCategories = data => event => {
        let categories = _.cloneDeep(this.state.getCategoriesList);
        if (data.isFullyAuthorizedCategory) {
            //Fully authorized is true then all categories will be selected else all will be false.
            categories = categories.map(each => {
                return {...each, checked: event.target.checked};
            });
        } else {
            for (let index of categories) {
                if (index.id === data.id) {
                    index['checked'] = event.target.checked;
                }
            }
            //Fully authorized make it as false as other category is unchecked.
            let getFullyAuthorizedObj = categories.filter(obj => obj.isFullyAuthorizedCategory === true);
            let getCheckedCategoriesLength = categories.filter(
                obj => obj.checked === true && !obj.isFullyAuthorizedCategory,
            );
            if (getFullyAuthorizedObj[0]) {
                //Fully authorized value should be true if all other categories are checked.
                //If one category is unchecked then fully authorized should be unchecked.
                getFullyAuthorizedObj[0]['checked'] = getCheckedCategoriesLength.length + 1 === categories.length;
                let index = _.findIndex(categories, {
                    id: getFullyAuthorizedObj[0].id,
                });
                categories.splice(index, 1, getFullyAuthorizedObj[0]);
            }
        }
        this.setState(
            {
                getCategoriesList: categories,
            },
            () => {
                if (this.props.isContactForm) {
                    this.props.updateMultiSelectVal(true);
                    this.props.getUpdatedCategoryList({
                        categoryList: _.cloneDeep(this.state.getCategoriesList),
                        investorHavingNoContact: this.state.investorHavingNoContact,
                    });
                }
            },
        );
    };

    handleNoContactList = event => {
        this.setState({
            investorHavingNoContact: event.target.checked,
        });
    };

    render() {
        const count = FundUtils._getCheckedLength(this.state.getCategoriesList);
        const sortCategoryList = SortUtils._sortCategoryListAsc(this.state.getCategoriesList);
        return (
            <React.Fragment>
                <div
                    className={
                        'relative inline-block dropdownMultiSelect ' +
                        (this.props.isContactForm ? 'contact-select' : '')
                    }
                    id="multi-select">
                    <Button
                        className={
                            'ellipsis dropdownMultiSelect ' + (this.state.dropDownOpen ? 'arrow-up' : 'arrow-down')
                        }
                        onClick={this.handleClick}>
                        {count > 0
                            ? `${count} ${count === 1 ? 'Category' : 'Categories'} Selected`
                            : `Correspondence Category`}
                    </Button>
                    <div>
                        <ul
                            className={
                                this.state.dropDownOpen
                                    ? 'open modalBodyPopup dropdownMultiSelect'
                                    : 'none dropdownMultiSelect'
                            }
                            id={this.props.isContactForm ? 'multiselectListForm' : 'multiselectList'}>
                            {this.state.getCategoriesList.length > 0 &&
                                sortCategoryList.map(
                                    (record, index) =>
                                        parseInt(record.isActive) === 1 && (
                                            <li key={index} className="dropdownMultiSelect">
                                                <label className="dropdownMultiSelect">{record['categoryName']}</label>
                                                <CBox
                                                    className="dropdownMultiSelect"
                                                    checked={record['checked']}
                                                    onChange={this.updateCategories(record)}>
                                                    <span className="checkmark dropdownMultiSelect"></span>
                                                </CBox>
                                            </li>
                                        ),
                                )}

                            {this.state.getCategoriesList.length === 0 && (
                                <li className="dropdownMultiSelect">
                                    <label className="font-bold font14 text-center dropdownMultiSelect">
                                        No Categories
                                    </label>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MultiSelect;

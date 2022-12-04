import htmlparse from 'html-react-parser';
import theme from '../theme';

/**
 * Function used to build options for select type formFields
 *
 * @function
 * @param    {Object} data     can be any obj, made with this.state or jsonData passed to children
 * @param    {String} key    handles onChange for select type formFields
 * @return   {Array}    Returns an array of objects with 'label' and 'value' properties
 */

export const buildSelectOptions = (data, key) => {
    if (data?.[key]) {
        return data[key].map(item => ({label: item.name, value: item.id}));
    }
    console.debug('buildSelectOptions | Could not find parsed "key" in "data"');
    return [];
};

/**
 * Function used to add and remove checkbox values from the current selections
 *
 * @function
 * @param    {Array} option     Event value of option to be selected/deselected
 * @param    {Array} selectedOptions     Array of currently selected checkbox values
 * @return    {Array}    Returns array with option added or removed from current selections from state
 */
export const changeCheckBoxSelections = (option, selectedOptions) => {
    let selections = [...(selectedOptions ?? [])];
    if (!option) return selections;
    const index = selections.indexOf(option);
    index > -1 ? selections.splice(index, 1) : selections.push(option);
    return selections;
};

const currencyFormatUsa = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
const currencyFormatUsaNoCents = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});
/**
 * Format a given number to a USD currency string.
 * NOTE: can be built out to support non USD currencies
 * @param {number} number - the number to format
 * @param {boolean} showFractionDigits - whether to show fraction digits
 * @returns {string} - the formatted currency string
 */
export const currencyFormatter = (number, showFractionDigits = true) =>
    showFractionDigits ? currencyFormatUsa.format(number) : currencyFormatUsaNoCents.format(number);

/**
 * Function used to highlight subString(s) within a string
 *
 * @function
 * @param    {String/Array} subString     Either single substring or array of strings meant to be highlighted
 * @param    {String} string    String containing subString(s)
 * @param    {String} color    Optional, highlight color, defaults to theme.secondary ('#5046FF')
 * @param    {String} bold    Optional, font weight, defaults to '500'
 * @return   {HTML node}       Reutrns an object contains a 'label' and 'value' property
 */
export const highlightSubString = (subString, string, color = theme.secondary, bold = '500') => {
    // so that you can pass just a string for single highlight usecases
    const arrayOfSubStrings = typeof subString === 'string' ? [subString] : subString;
    let templateString = string;
    arrayOfSubStrings.forEach(subStr => {
        templateString = templateString.replace(
            new RegExp(subStr, 'gi'),
            str => `<span style='color: ${color}; font-weight: ${bold}; text-decoration:underline;'>${str}</span>`,
        );
    });
    return htmlparse(`<span>${templateString}</span>`); // Could probably do some stuff with react/styled components
};

/**
 * Function onChange helper for extarcting relavant event info
 * Mostly useful for components that have multiple events that source its info from difference places
 * example: InvestorInformation uses most types of FormFields
 *
 * @event
 * @param    {Event Object} e
 * @param    {String} key    used to handle onChange for select type formFields
 *  @param    {Function} convertEventToStateValue
 */
export const onChange = (e, key, convertEventToStateValue) => {
    // First - extract relevant event info if present
    //         some FormField events dont have any useful event name (checkbox/select)
    //         in these cases a `key` is passed which corresponds with the field's name and value key in state
    const name = e?.target?.name ?? key;
    const eventValue = e?.target?.value ?? e?.value ?? e;

    // Second - the value of the event isnt always the value we want to save in state
    //          to handle cases like these we pass a converter function
    //          convertEventToStateValue requires two arguments: name AND eventValue
    //
    //          If convertEventToStateValue is passed but missing the required arguments
    //          then an error is thrown
    const stateValue =
        typeof convertEventToStateValue === 'function' && convertEventToStateValue?.length === 2
            ? convertEventToStateValue?.(name, eventValue) ?? eventValue
            : eventValue;
    if (typeof convertEventToStateValue === 'function' && convertEventToStateValue?.length !== 2) {
        console.debug('convertEventToStateValue | Requires two arguments, eventName AND eventValue');
    } else if (typeof convertEventToStateValue !== 'function') {
        console.debug('convertEventToStateValue | Requires typeof === "function", was not a function');
    }

    // Lastly - We check name/stateValue is not null/undefined
    //          If both are present we return an object with `key: value` being `eventName: eventValue`
    //          or if one/both are present we throw a console.debug
    return name == null || stateValue == null // == null    will also catch undefined values
        ? console.debug('onChange | Missing "name" or "stateValue"')
        : {[name]: stateValue};
};

/**
 * Function used to find the current selected value within a set of items, used for select type formFields
 *
 * @function
 * @param    {Object} data     can be any obj, made with this.state or jsonData passed to children
 * @param    {String} objKey    handles onChange for select type formFields
 * @param    {String} valueKey    handles onChange for select type formFields
 * @return   {Object}       Reutrns an object contains a 'label' and 'value' property
 */
export const selectInputValue = (data, objKey, valueKey) => {
    if (data?.[objKey] && data?.[valueKey]) {
        return {
            label: data[objKey]
                .filter(item => {
                    return parseInt(data[valueKey]) === item.id;
                })
                .map(item => item.name),
            value: data?.[valueKey],
        };
    }
    console.debug('selectInputValue | Could not find parsed "objKey" or "valueKey" in "data"');
    return;
};

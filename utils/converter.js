/* eslint-disable no-extend-native */
import moment from 'moment'
import BrowserUtil from './browser'

class Converter {
  convertToCurrency(value) {
    let amount = parseFloat(value)
    //This formatter will support IE Edge only
    if (
      amount !== '' &&
      (BrowserUtil.get_browser().name !== 'MSIE' ||
        (BrowserUtil.get_browser().name === 'MSIE' && BrowserUtil.get_browser().version > 10))
    ) {
      // Create our number formatter.
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
      })
      return formatter.format(amount)
    } else {
      return '$' + amount
    }
  }

  convertToCurrencyTwodecimals(value) {
    let amount = parseFloat(value)
    //This formatter will support IE Edge only
    if (
      amount !== '' &&
      (BrowserUtil.get_browser().name !== 'MSIE' ||
        (BrowserUtil.get_browser().name === 'MSIE' && BrowserUtil.get_browser().version > 10))
    ) {
      // Create our number formatter.
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
      })
      return formatter.format(amount)
    } else {
      return '$' + amount
    }
  }

  convertDate(date) {
    // Hack For IE
    if (!String.prototype.padStart) {
      String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0 //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ')
        if (this.length >= targetLength) {
          return String(this)
        } else {
          targetLength = targetLength - this.length
          if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
          }
          return padString.slice(0, targetLength) + String(this)
        }
      }
    }
    var dateConversion = new Date(date)
    var hours = dateConversion.getHours() > 12 ? dateConversion.getHours() - 12 : dateConversion.getHours()
    var amPm = dateConversion.getHours() >= 12 ? 'PM' : 'AM'
    var convertedDate =
      dateConversion.getMonth() +
      1 +
      '/' +
      dateConversion.getDate() +
      ' - ' +
      hours +
      ':' +
      String(dateConversion.getMinutes()).padStart(2, '0') +
      ' ' +
      amPm
    return convertedDate
  }

  dateFormat(date) {
    if (date) {
      var formattedDate = new Date(date)
      var convertedDate =
        formattedDate.getMonth() + 1 + '/' + formattedDate.getDate() + '/' + formattedDate.getFullYear()
      return convertedDate
    }
  }

  toMonthDateYear(date) {
    return moment(date).format('MMM DD, YYYY')
  }

  utcDateToDateTimeFormat(date) {
    return moment(date).format('MM-DD-YYYY HH:mm:ss ')
  }

  utcDateToLocalTimezoneWithoutFormat(date) {
    let offset = new Date().getTimezoneOffset()
    return moment(date).utcOffset(offset).format()
  }

  getDateFromFormat(date) {
    let Date = date.split(' ')
    return Date[0]
  }

  getTimeFromFormat(date) {
    let Date = date.split(' ')
    if (Date[1] && Date[2]) return Date[1] + ' ' + Date[2]
    else return Date[1]
  }

  getPhoneNoFormat(phoneno) {
    let formattedNumber = phoneno
    if (phoneno && phoneno.includes('+1')) {
      let num = phoneno.substring(2, phoneno.length)
      let area = num.substring(0, 3)
      let front = num.substring(3, 6)
      let end = num.substring(6, num.length)
      if (front) {
        formattedNumber = '(' + area + ') ' + front
      }
      if (end) {
        formattedNumber += '-' + end
      }
    }
    return formattedNumber
  }

  getPhoneNoDashedFormat(phoneno) {
    let formattedNumber = phoneno
    //Mask only for US
    if (phoneno && phoneno.includes('+1')) {
      let num = phoneno.substring(2, phoneno.length)
      let area = num.substring(0, 3)
      let front = num.substring(3, 6)
      let end = num.substring(6, num.length)
      if (front) {
        formattedNumber = area + '-' + front
      }
      if (end) {
        formattedNumber += '-' + end
      }
    }
    return formattedNumber
  }

  socialSecurityNumberFormat(socialSecurityValue) {
    var digits = socialSecurityValue.toString().split('')
    let finalValue = ''
    digits.forEach(function (value, i) {
      if (i <= 10) {
        if ((parseInt(i) === 3 || parseInt(i) === 5) && value !== '-') {
          finalValue = finalValue + '-'
        }
        finalValue = finalValue + value
      }
    })
    return finalValue
  }

  employeeIdentificationNumber(employeeValue) {
    var digits = employeeValue.toString().split('')
    let finalValue = ''
    digits.forEach(function (value, i) {
      if (i <= 10) {
        if (parseInt(i) === 2 && value !== '-') {
          finalValue = finalValue + '-'
        }
        finalValue = finalValue + value
      }
    })
    return finalValue
  }

  getFullName(user) {
    if (!user) return ''
    if (user.firstName || user.lastName) {
      return [user.firstName, user.middleName, user.lastName]
        .filter(Boolean)
        .map(n => n.trim())
        .join(' ')
    }
    return user.email || ''
  }

  getFullNameWithEllipsis(user) {
    const name = this.getFullName(user)
    return name.length > 30 ? name.slice(0, 30) + '...' : name
  }

  _socailNumberMasking(value) {
    if (value) {
      var res = value, //grabs the value
        len = res.length, //grabs the length
        stars =
          len > 0 ? (len > 1 ? (len > 2 ? (len > 3 ? (len > 4 ? 'XXX-XX-' : 'XXX-X') : 'XXX-') : 'XX') : 'X') : '', //this provides the masking and formatting
        result = stars + res.substring(5) //this is the result
      return result
    }
    return value
  }

  _removeSpecialCharacters(value) {
    let s = value.replace(/[&/\\#,+()$~%.'":*?<>{}-]/g, '')
    return s
  }

  decodeObj(obj) {
    if (!Array.isArray(obj) && typeof obj != 'object') return obj
    return Object.keys(obj).reduce(
      (acc, key) => {
        acc[key] =
          obj[key] != null
            ? typeof obj[key] == 'string'
              ? this.decodeEntities(obj[key])
              : this.decodeObj(obj[key])
            : null
        return acc
      },
      Array.isArray(obj) ? [] : {}
    )
  }

  decodeEntities(encodedString) {
    var textArea = document.createElement('textarea')
    textArea.innerHTML = encodedString
    return textArea.value
  }

  /**
   * Restrict Target commit per to 100 if it is greater than 100
   * This we can see in progress bar in fund tile dashboard and tracker screens.
   */
  _getPer = val => {
    return val > 100 ? '100%' : `${val}%`
  }

  _progreesBar(pagesCompleted = 0, totalPageCount = 0) {
    return (pagesCompleted / totalPageCount) * 100 + '%'
  }

  toFormData(obj) {
    const formData = new FormData()
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        formData.append(key, obj[key])
      }
    }

    return formData
  }

  convertAsciiCharacters(str) {
    return str.replace(/&#(\d+);/g, function (m, n) {
      return String.fromCharCode(n)
    })
  }

  encodeAsciiCharacters(str) {
    ;['`'].forEach(character => (str = str.replaceAll(character, `&#${character.charCodeAt(0)};`)))

    return str
  }

  dateStringToReadableDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options) // example output: December 1, 2020
    // If we support multiple languages this will need adjustments
  }

  getFileExtension(fileName) {
    return fileName.split('.').pop().toLowerCase()
  }

  /**
   * Determine if a date is valid. If invalid, `getTime` returns `NaN` which is not equal to itself.
   * @param {Date} date - Date to validate
   * @returns {boolean} - true if the date is valid
   */
  isDateValid = date => date.getTime() === date.getTime()

  PT = 'America/Los_Angeles'

  capitalize = words =>
    words
      ?.split(' ')
      .map(word => {
        const first = word?.charAt(0)?.toUpperCase()
        const last = word?.slice(1)?.toLowerCase()
        return `${first}${last}`
      })
      .join(' ') ?? words

  truncateString = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str.substring(0, maxLength) + '...'
    } else {
      return str
    }
  }

  convertText = text => {
    if (text) {
      // Convert text to lowercase
      const lowercasedText = text?.toLowerCase()
      // Replace spaces with underscores
      const result = lowercasedText.replace(/ /g, '_')
      return result
    }
  }
}

export default new Converter()

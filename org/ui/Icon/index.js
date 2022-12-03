import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as AlertIcon} from '../icons/alert.svg';
import {ReactComponent as CheckmarkIcon} from '../icons/checkmark.svg';
import {ReactComponent as CheckmarkContainerIcon} from '../icons/checkmark-container.svg';
import {ReactComponent as CheckmarkMinusIcon} from '../icons/checkmark-minus.svg';
import {ReactComponent as ContactsIcon} from '../icons/contacts.svg';
import {ReactComponent as AlertDoneIcon} from '../icons/alert-done.svg';
import {ReactComponent as DesktopIcon} from '../icons/desktop.svg';
import {ReactComponent as DocumentLockerIcon} from '../icons/document-locker.svg';
import {ReactComponent as DocumentLockerIconSmall} from '../icons/document-locker-small.svg';
import {ReactComponent as ExcelIcon} from '../icons/excel.svg';
import {ReactComponent as ExpandIcon} from '../icons/expand-down.svg';
import {ReactComponent as EditIcon} from '../icons/edit.svg';
import {ReactComponent as FileIcon} from '../icons/file.svg';
import {ReactComponent as Clock} from '../icons/clock.svg';
import {ReactComponent as calendar} from '../icons/calendar.svg';
import {ReactComponent as CloseBtn} from '../icons/closeBtn.svg';
import {ReactComponent as FilterUpIcon} from '../icons/up-arrow.svg';
import {ReactComponent as FilterDownIcon} from '../icons/down-arrow.svg';
import {ReactComponent as FilterDownIconLarge} from '../icons/down-arrow-large.svg';
import {ReactComponent as FundIcon} from '../icons/fundnav.svg';
import {ReactComponent as InfoIcon} from '../icons/info.svg';
import {ReactComponent as MenuIcon} from '../icons/menu.svg';
import {ReactComponent as HelpIcon} from '../icons/help.svg';
import {ReactComponent as LinkIcon} from '../icons/link.svg';
import {ReactComponent as circleWCheck} from '../icons/circleWCheck.svg';
import {ReactComponent as circleWCross} from '../icons/circleWCross.svg';
import {ReactComponent as LockerIcon} from '../icons/locker.svg';
import {ReactComponent as LeftArrow} from '../icons/left-arrow.svg';
import {ReactComponent as RightArrow} from '../icons/right-arrow.svg';
import {ReactComponent as NotificationIcon} from '../icons/notification.svg';
import {ReactComponent as NotificationIconFilled} from '../icons/Notification-filled.svg';
import {ReactComponent as PenIcon} from '../icons/pen.svg';
import {ReactComponent as PenGroupIcon} from '../icons/pen-group.svg';
import {ReactComponent as PapersLinedIcon} from '../icons/papers-lined.svg';
import {ReactComponent as AlertLarge} from '../icons/alert-large.svg';
import {ReactComponent as PapersRefreshIcon} from '../icons/papers-refresh.svg';
import {ReactComponent as PenWritingIcon} from '../icons/pen-writing.svg';
import {ReactComponent as PendingDocIcon} from '../icons/pending-doc.svg';
import {ReactComponent as ProfileIcon} from '../icons/profile-white.svg';
import {ReactComponent as ProfileNewIcon} from '../icons/profile-new.svg';
import {ReactComponent as ReportingIcon} from '../icons/reporting.svg';
import {ReactComponent as CloseIcon} from '../icons/close.svg';
import {ReactComponent as ClosingIcon} from '../icons/closing.svg';
import {ReactComponent as BackIcon} from '../icons/back.svg';
import {ReactComponent as DotMenuIcon} from '../icons/dot-menu.svg';
import {ReactComponent as SearchIcon} from '../icons/search.svg';
import {ReactComponent as SyndicationIcon} from '../icons/syndication-icon.svg';
import {ReactComponent as LargeExpand} from '../icons/large-expand.svg';
import {ReactComponent as LargeMenu} from '../icons/large-menu.svg';
import {ReactComponent as ProfileIconSquareBorder} from '../icons/profileWSquareBorder.svg';
import {ReactComponent as ExclaimationPoint} from '../icons/exclaimpoint.svg';
import {ReactComponent as CircleIcon} from '../icons/circle.svg';
import {ReactComponent as Minus} from '../icons/minus-check.svg';
import {ReactComponent as StarEmpty} from '../icons/star-empty.svg';
import {ReactComponent as StarFull} from '../icons/star-full.svg';
import {ReactComponent as ArrowRight} from '../icons/arrow-right.svg';
import {ReactComponent as Dashboard} from '../icons/dashboard.svg';
import {ReactComponent as Timeout} from '../icons/timeout.svg';

const mapNameIcons = {
    alert: AlertIcon,
    alertDone: AlertDoneIcon,
    back: BackIcon,
    arrowRight: ArrowRight,
    calendar: calendar,
    check: CheckmarkIcon,
    checkbox: CheckmarkContainerIcon,
    checksome: CheckmarkMinusIcon,
    circle: CircleIcon,
    circleWCheck: circleWCheck,
    circleWCross: circleWCross,
    close: CloseIcon,
    closing: ClosingIcon,
    clock: Clock,
    closeBtn: CloseBtn,
    contacts: ContactsIcon,
    desktop: DesktopIcon,
    dashboard: Dashboard,
    documentLocker: DocumentLockerIcon,
    documentLockerSmall: DocumentLockerIconSmall,
    dotmenu: DotMenuIcon,
    downArrowLarge: FilterDownIconLarge,
    edit: EditIcon,
    excel: ExcelIcon,
    exclaimPoint: ExclaimationPoint,
    expand: ExpandIcon,
    file: FileIcon,
    filterup: FilterUpIcon,
    filterdown: FilterDownIcon,
    fund: FundIcon,
    help: HelpIcon,
    info: InfoIcon,
    largeExpand: LargeExpand,
    largeMenu: LargeMenu,
    LeftArrow: LeftArrow,
    link: LinkIcon,
    locker: LockerIcon,
    minus: Minus,
    notification: NotificationIcon,
    notificationFilled: NotificationIconFilled,
    pen: PenIcon,
    penGroup: PenGroupIcon,
    papersLined: PapersLinedIcon,
    alertLarge: AlertLarge,
    papersRefresh: PapersRefreshIcon,
    penWriting: PenWritingIcon,
    pending: PendingDocIcon,
    profile: ProfileIcon,
    profileNew: ProfileNewIcon,
    profilePic: ProfileIconSquareBorder,
    report: ReportingIcon,
    menu: MenuIcon,
    RightArrow: RightArrow,
    search: SearchIcon,
    starEmpty: StarEmpty,
    starFull: StarFull,
    syndication: SyndicationIcon,
    timeout: Timeout,
};

/**
 * Icon Component.
 */
const Icon = ({name, ...rest}) => {
    if (name && mapNameIcons[name]) {
        const IconElement = mapNameIcons[name];
        return <IconElement {...rest} />;
    }
    return null;
};

Icon.propTypes = {
    /** name of icon file */
    name: PropTypes.string.isRequired,
    /** choose color of some icons */
    fill: PropTypes.string,
};

export default Icon;

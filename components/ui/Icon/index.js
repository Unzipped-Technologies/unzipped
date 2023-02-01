import React from 'react';
import PropTypes from 'prop-types';
import AlertIcon from '../icons/alert';
import CheckmarkIcon from '../icons/checkmark';
import CheckmarkContainerIcon from '../icons/checkmark-container';
import CheckmarkMinusIcon from '../icons/checkmark-minus';
import ContactsIcon from '../icons/contacts';
import AlertDoneIcon from '../icons/alert-done';
import DesktopIcon from '../icons/desktop';
import DocumentLockerIcon from '../icons/document-locker';
import DocumentLockerIconSmall from '../icons/document-locker-small';
import ExcelIcon from '../icons/excel';
import ExpandIcon from '../icons/expand-down';
import EditIcon from '../icons/edit';
import FileIcon from '../icons/file';
import Clock from '../icons/clock';
import calendar from '../icons/calendar';
import CloseBtn from '../icons/closeBtn';
import FilterUpIcon from '../icons/up-arrow';
import FilterDownIcon from '../icons/down-arrow';
import FundIcon from '../icons/fundnav';
import InfoIcon from '../icons/info';
import MenuIcon from '../icons/menu';
import HelpIcon from '../icons/help';
import LinkIcon from '../icons/link';
import circleWCheck from '../icons/circleWCheck';
import circleWCross from '../icons/circleWCross';
import LockerIcon from '../icons/locker';
import LeftArrow from '../icons/left-arrow';
import RightArrow from '../icons/right-arrow';
import NotificationIcon from '../icons/notification';
import NotificationIconFilled from '../icons/Notification-filled';
import PenIcon from '../icons/pen';
import PenGroupIcon from '../icons/pen-group';
import PapersLinedIcon from '../icons/papers-lined';
import AlertLarge from '../icons/alert-large';
import PapersRefreshIcon from '../icons/papers-refresh';
import PenWritingIcon from '../icons/pen-writing';
import PendingDocIcon from '../icons/pending-doc';
import ProfileIcon from '../icons/profile-white';
import ProfileNewIcon from '../icons/profile-new';
import ReportingIcon from '../icons/reporting';
import CloseIcon from '../icons/close';
import ClosingIcon from '../icons/closing';
import BackIcon from '../icons/back';
import DotMenuIcon from '../icons/dot-menu';
import SearchIcon from '../icons/search';
import SyndicationIcon from '../icons/syndication-icon';
import LargeExpand from '../icons/large-expand';
import LargeMenu from '../icons/large-menu';
import ProfileIconSquareBorder from '../icons/profileWSquareBorder';
import ExclaimationPoint from '../icons/exclaimpoint';
import CircleIcon from '../icons/circle';
import Minus from '../icons/minus-check';
import StarEmpty from '../icons/star-empty';
import StarFull from '../icons/star-full';
import ArrowRight from '../icons/arrow-right';
import Dashboard from '../icons/dashboard';
import Timeout from '../icons/timeout';
import Facebook from '../icons/facebook';
import Twitter from '../icons/twitter';
import Tiktok from '../icons/tiktok';
import Copywrite from '../icons/Copywrite';
import GoogleCircle from '../icons/GoogleCircle';
import Github from '../icons/github';
import Question from '../icons/question';
import Glasses from '../icons/glasses';
import Compass from '../icons/compass';
import Play from '../icons/play';
import QuestionCircle from '../icons/questionCircle';
import Logo from '../icons/logo';
import EyeIcon from '../icons/eye';
import send from '../icons/send';
import paperClip from '../icons/paperClip';
import HeartIcon from '../icons/heart';
import SuitcaseIcon from '../icons/suitcase';
import DepartmentIcon from '../icons/department';
import SelectedDepartmentIcon from '../icons/selectedDepartment';
import DownWideIcon from '../icons/downWideIcon';
import ActionIcon from '../icons/ActionIcon';
import circleCheck from '../icons/checkCircle';
import successCheck from '../icons/successCheck';
import AlertRedIcon from '../icons/alert-red';
import BackArrowLong from '../icons/backArrowLong';
import Breifcase from '../icons/breifcase';
import User from '../icons/user';
import CheckMenu from '../icons/CheckMenu';
import CartAlt from '../icons/CartAlt';
import ChatBubble from '../icons/ChatBubble';
import PhoneAlt from '../icons/PhoneAlt';
import colorEmail from '../icons/colorEmail';
import colorPhone from '../icons/colorPhone';
import colorSheild from '../icons/colorSheild';
import colorUser from '../icons/colorUser';
import thumbsUp from '../icons/thumbsUp';
import thumbsDown from '../icons/thumbsDown';
import WorkIcon from '../icons/work';
import FolderIcon from '../icons/folder';
import BookmarkIcon from '../icons/bookmark';
import LightIcon from '../icons/light';

const mapNameIcons = {
    alert: AlertIcon,
    actionIcon: ActionIcon,
    alertDone: AlertDoneIcon,
    alertRed: AlertRedIcon,
    WorkIcon: WorkIcon,
    FolderIcon: FolderIcon,
    BookmarkIcon: BookmarkIcon,
    LightIcon: LightIcon,
    back: BackIcon,
    BackArrowLong: BackArrowLong,
    breifcase: Breifcase,
    checkMenu: CheckMenu,
    cartAlt: CartAlt,
    chatBubble: ChatBubble,
    colorEmail: colorEmail,
    colorPhone: colorPhone,
    colorSheild: colorSheild,
    colorUser: colorUser,
    phoneAlt: PhoneAlt,
    arrowRight: ArrowRight,
    calendar: calendar,
    check: CheckmarkIcon,
    checkbox: CheckmarkContainerIcon,
    eye: EyeIcon,
    send: send,
    paperClip: paperClip,
    heart: HeartIcon,
    suitcase: SuitcaseIcon,
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
    Facebook: Facebook,
    Twitter: Twitter,
    Tiktok: Tiktok,
    documentLocker: DocumentLockerIcon,
    documentLockerSmall: DocumentLockerIconSmall,
    dotmenu: DotMenuIcon,
    edit: EditIcon,
    excel: ExcelIcon,
    exclaimPoint: ExclaimationPoint,
    expand: ExpandIcon,
    file: FileIcon,
    glasses: Glasses,
    compass: Compass,
    play: Play,
    questionCircle: QuestionCircle,
    filterup: FilterUpIcon,
    filterdown: FilterDownIcon,
    logo: Logo,
    fund: FundIcon,
    help: HelpIcon,
    department: DepartmentIcon,
    selectedDepartment: SelectedDepartmentIcon,
    successCheck: successCheck,
    circleCheck: circleCheck,
    info: InfoIcon,
    largeExpand: LargeExpand,
    largeMenu: LargeMenu,
    LeftArrow: LeftArrow,
    downWideIcon: DownWideIcon,
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
    question: Question,
    RightArrow: RightArrow,
    search: SearchIcon,
    starEmpty: StarEmpty,
    starFull: StarFull,
    syndication: SyndicationIcon,
    timeout: Timeout,
    copywrite: Copywrite,
    googleCircle: GoogleCircle,
    github: Github,
    user: User,
    thumbsUp: thumbsUp,
    thumbsDown: thumbsDown
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

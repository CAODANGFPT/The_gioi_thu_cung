import UserIcons from "../svg/account/User";
import PethouseIcon from "../svg/pethouseIcon";
import ReviewIcon from "../svg/review";
import StatusIcon from "../svg/status";
import { personsImgs } from "../utils/images";
import BillsIcon from "./../svg/billsIcon";
import HomeIcon from "./../svg/homeIcon";
import ReportIcon from "./../svg/reportIcon";
import PetIcon from "../svg/PetsIcon";
import NewIcon from "../svg/newIcon";
import ProfileIcon from "../svg/profileIcon";
import AppoinmentIcon from "../svg/appoinmentIcon";
import HistoryIcon from "../svg/history";
import StatusAppoint from "../svg/statusAppoint";
import StatusContact from "../svg/statusContact";
import SpeciesIcon from "../svg/speciesIcon";
import ServicesIcon from "../svg/serviceIcon";
import AddressCardIcon from "../svg/addressCard";
import BreedIcon from "../svg/breed";
import StaffDo from "../svg/staffDo";
import TimeLine from "../svg/timeLine";
import RoleIcon from "../svg/roleIcon";
import AboutMeIcon from "../svg/aboutMe";
import Category from "../svg/category";
export const navigationLinks = [
  { id: 1, title: "Dasboard", image: HomeIcon, link: "dashboard" },
  { id: 2, title: "History", image: HistoryIcon, link: "history" },
  { id: 3, title: "Appointments", image: AppoinmentIcon, link: "appointment" },
  { id: 4, title: "Pets", image: PetIcon, link: "pets" },
  { id: 5, title: "Contact", image: AddressCardIcon, link: "contact" },
  { id: 6, title: "Status Confirmed", image: StatusAppoint, link: "status_appointment" },
  { id: 7, title: "Status Contact", image: StatusContact, link: "status_contact" },
  { id: 8, title: "Services", image: ServicesIcon, link: "services" },
  { id: 9, title: "Pet House", image: PethouseIcon, link: "pethouse" },
  { id: 10, title: "Breed", image: BreedIcon, link: "breed" },
  { id: 11, title: "Species", image: SpeciesIcon, link: "species" },
  { id: 12, title: "Staff Do", image: StaffDo, link: "staff" },
  { id: 13, title: "Set Time", image: TimeLine, link: "settime" },
  { id: 14, title: "Category", image: Category, link: "category" },
  { id: 15, title: "User", image: UserIcons, link: "user" },
  { id: 16, title: "Role", image: RoleIcon, link: "role" },
  { id: 17, title: "Profile", image: ProfileIcon, link: "profile" },
  { id: 18, title: "Đánh giá", image: ReviewIcon, link: "review" },
  { id: 19, title: "News", image: NewIcon, link: "news" },
  { id: 20, title: "About", image: AboutMeIcon, link: "about" },

];

export const transactions = [
  {
    id: 11,
    name: "Sarah Parker",
    image: personsImgs.person_four,
    date: "23/12/04",
    amount: 22000,
  },
  {
    id: 12,
    name: "Krisitine Carter",
    image: personsImgs.person_three,
    date: "23/07/21",
    amount: 20000,
  },
  {
    id: 13,
    name: "Irene Doe",
    image: personsImgs.person_two,
    date: "23/08/25",
    amount: 30000,
  },
];

export const reportData = [
  {
    id: 14,
    month: "Jan",
    value1: 45,
    value2: null,
  },
  {
    id: 15,
    month: "Feb",
    value1: 45,
    value2: 60,
  },
  {
    id: 16,
    month: "Mar",
    value1: 45,
    value2: null,
  },
  {
    id: 17,
    month: "Apr",
    value1: 45,
    value2: null,
  },
  {
    id: 18,
    month: "May",
    value1: 45,
    value2: null,
  },
];

export const budget = [
  {
    id: 19,
    title: "Subscriptions",
    type: "Automated",
    amount: 22000,
  },
  {
    id: 20,
    title: "Loan Payment",
    type: "Automated",
    amount: 16000,
  },
  {
    id: 21,
    title: "Foodstuff",
    type: "Automated",
    amount: 20000,
  },
  {
    id: 22,
    title: "Subscriptions",
    type: null,
    amount: 10000,
  },
  {
    id: 23,
    title: "Subscriptions",
    type: null,
    amount: 40000,
  },
];

export const subscriptions = [
  {
    id: 24,
    title: "LinkedIn",
    due_date: "23/12/04",
    amount: 20000,
  },
  {
    id: 25,
    title: "Netflix",
    due_date: "23/12/10",
    amount: 5000,
  },
  {
    id: 26,
    title: "DSTV",
    due_date: "23/12/22",
    amount: 2000,
  },
];

export const savings = [
  {
    id: 27,
    image: personsImgs.person_one,
    saving_amount: 250000,
    title: "Pay kid bro’s fees",
    date_taken: "23/12/22",
    amount_left: 40000,
  },
];

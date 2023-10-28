import UserIcons from "../svg/account/User";
import PethouseIcon from "../svg/pethouseIcon";
import ServicesIcon from "../svg/services";
import SpeciesIcon from "../svg/species";
import ReviewIcon from "../svg/review";
import StatusIcon from "../svg/status";
import { personsImgs } from "../utils/images";
import BillsIcon from "./../svg/billsIcon";
import HomeIcon from "./../svg/homeIcon";
import ReportIcon from "./../svg/reportIcon";
import PetIcon from "../svg/PetsIcon";
export const navigationLinks = [
  { id: 1, title: "Home", image: HomeIcon, link: "dashboard" },
  { id: 2, title: "Status", image: StatusIcon, link: "status" },
  { id: 3, title: "Đánh giá", image: ReviewIcon, link: "review" },
  { id: 4, title: "User", image: UserIcons, link: "user" },
  { id: 5, title: "Role", image: BillsIcon, link: "role" },
  { id: 6, title: "SetTime", image: ReportIcon, link: "settime" },
  { id: 10, title: "Staff", image: ReportIcon, link: "staff" },
  { id: 7, title: "Services", image: ServicesIcon, link: "services" },
  { id: 8, title: "Pethouse", image: PethouseIcon, link: "pethouse" },
  { id: 9, title: "Species", image: SpeciesIcon, link: "species" },
  { id: 11, title: "Breed", image: SpeciesIcon, link: "breed" },
  { id: 12, title: "Contact", image: SpeciesIcon, link: "contact" },
  { id: 13, title: "Profile", image: SpeciesIcon, link: "profile" },
  { id: 14, title: "News", image: SpeciesIcon, link: "news" },
  { id: 15, title: "Pets", image: PetIcon, link: "pets" },
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

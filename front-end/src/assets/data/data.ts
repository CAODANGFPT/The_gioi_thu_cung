import PetIcon from "../svg/PetsIcon";
import AboutMeIcon from "../svg/aboutMe";
import UserIcons from "../svg/account/User";
import AddressCardIcon from "../svg/addressCard";
import AppoinmentIcon from "../svg/appoinmentIcon";
import BannerIcon from "../svg/banner";
import BreedIcon from "../svg/breed";
import Category from "../svg/category";
import NewIcon from "../svg/newIcon";
import PethouseIcon from "../svg/pethouseIcon";
import ProductIcon from "../svg/products";
import ProfileIcon from "../svg/profileIcon";
import ReviewIcon from "../svg/review";
import RoleIcon from "../svg/roleIcon";
import ServicesIcon from "../svg/serviceIcon";
import SpeciesIcon from "../svg/speciesIcon";
import StaffDo from "../svg/staffDo";
import StatusAppoint from "../svg/statusAppoint";
import StatusContact from "../svg/statusContact";
import StatusPet from "../svg/statusPet";
import { personsImgs } from "../utils/images";
import HomeIcon from "./../svg/homeIcon";
export const navigationLinks = [
  { id: 1, title: "Bảng điều khiển", image: HomeIcon, link: "/admin" },
  { id: 3, title: "Đặt Lịch", image: AppoinmentIcon, link: "appointment" },
  { id: 4, title: "Thú Cưng", image: PetIcon, link: "pets" },
  { id: 5, title: "Liên Hệ", image: AddressCardIcon, link: "contact" },
  {
    id: 6,
    title: "Trạng thái xác nhận",
    image: StatusAppoint,
    link: "status_appointment",
  },
  {
    id: 7,
    title: "Trạng thái liên hệ",
    image: StatusContact,
    link: "status_contact",
  },
  {
    id: 23,
    title: "Trạng thái thú cưng",
    image: StatusPet,
    link: "status_pet",
  },
  { id: 8, title: "Dịch Vụ", image: ServicesIcon, link: "services" },
  { id: 9, title: "Phòng", image: PethouseIcon, link: "pethouse" },
  { id: 10, title: "Giống", image: BreedIcon, link: "breed" },
  { id: 11, title: "Loài", image: SpeciesIcon, link: "species" },
  { id: 12, title: "Nhân Viên", image: StaffDo, link: "staff" },
  { id: 14, title: "Danh Mục", image: Category, link: "category" },
  { id: 21, title: "Sản Phẩm", image: ProductIcon, link: "products" },
  { id: 15, title: "Người dùng", image: UserIcons, link: "user" },
  { id: 16, title: "Chức năng", image: RoleIcon, link: "role" },
  { id: 17, title: "Hồ Sơ", image: ProfileIcon, link: "profile" },
  { id: 18, title: "Đánh giá", image: ReviewIcon, link: "review" },
  { id: 19, title: "Bản tin", image: NewIcon, link: "news" },
  { id: 20, title: "về chúng tôi", image: AboutMeIcon, link: "about" },
  { id: 22, title: "Banner", image: BannerIcon, link: "banner" },
  {
    id: 24,
    title: "Trạng thái đặt hàng",
    image: StatusPet,
    link: "status_order",
  },
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

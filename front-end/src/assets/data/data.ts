import PetIcon from "../svg/PetsIcon";
import AboutMeIcon from "../svg/aboutMe";
import UserIcons from "../svg/account/User";
import AddressCardIcon from "../svg/addressCard";
import AppoinmentIcon from "../svg/appoinmentIcon";
import BannerIcon from "../svg/banner";
import BreedIcon from "../svg/breed";
import Category from "../svg/category";
import FooterIcon from "../svg/footerIcon";
import MenuIcon2 from "../svg/menuIcon2";
import MenuTypeIcon from "../svg/menuTypeIcon";
import NewIcon from "../svg/newIcon";
import OrderIcon from "../svg/order";
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
  { id: 2, title: "Đặt Lịch", image: AppoinmentIcon, link: "appointment" },
  { id: 3, title: "Đơn hàng", image: OrderIcon, link: "order" },

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
    id: 8,
    title: "Trạng thái thú cưng",
    image: StatusPet,
    link: "status_pet",
  },
  { id: 9, title: "Dịch Vụ", image: ServicesIcon, link: "services" },
  { id: 10, title: "Phòng", image: PethouseIcon, link: "pethouse" },
  { id: 11, title: "Giống", image: BreedIcon, link: "breed" },
  { id: 12, title: "Loài", image: SpeciesIcon, link: "species" },
  { id: 13, title: "Nhân Viên", image: StaffDo, link: "staff" },
  { id: 14, title: "Danh Mục", image: Category, link: "category" },
  { id: 15, title: "Sản Phẩm", image: ProductIcon, link: "products" },
  {
    id: 16,
    title: "Trạng thái đặt hàng",
    image: StatusPet,
    link: "status_order",
  },
  { id: 17, title: "Người dùng", image: UserIcons, link: "user" },
  { id: 18, title: "Vai trò", image: RoleIcon, link: "role" },
  { id: 19, title: "Pet Care", image: ProfileIcon, link: "websiteinformation" },
  { id: 20, title: "Đánh giá", image: ReviewIcon, link: "review" },
  { id: 21, title: "Bản tin", image: NewIcon, link: "news" },
  { id: 22, title: "về chúng tôi", image: AboutMeIcon, link: "about" },
  { id: 23, title: "Kiểu Menu", image: MenuTypeIcon, link: "menutype" },
  { id: 24, title: "Menu", image: MenuIcon2, link: "menu" },
  { id: 25, title: "Banner", image: BannerIcon, link: "banner" },
  { id: 26, title: "Footer", image: FooterIcon, link: "footer" },
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

import { toggleMenu } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useEthers, useTransactions } from "@usedapp/core";
import {
  getMainPath,
} from "../utils";
import { ScreenSize } from "../constants/constants";
import { useLocation } from "react-router-dom";
import { Pages } from "../constants/constants";
import MenuIcon from "../assets/icons/hamburger.icon";
import CloseIcon from "../assets/icons/close.icon";
import { RootState } from "../reducers";
import WalletInfo from "./WalletInfo/WalletInfo";
import WalletButton from "./WalletButton/WalletButton";
import "../styles/Header.scss";
import "../styles/global.scss";
import Logo from "assets/icons/logo.icon";
import useModal from "hooks/useModal";
import Modal from "./Shared/Modal/Modal";
import MyAccount from "./MyAccount/MyAccount";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { screenSize, showMenu } = useSelector((state: RootState) => state.layoutReducer);
  const { account } = useEthers();
  const currentTransaction = useTransactions().transactions.find(tx => !tx.receipt);
  const { isShowing, toggle } = useModal();

  return (
    <header data-testid="Header">
      {screenSize === ScreenSize.Desktop && (
        <div className="page-title">
          {Pages[getMainPath(location.pathname)]}
        </div>
      )}
      {account && <button onClick={toggle}>My Account</button>}
      {screenSize === ScreenSize.Mobile && <Logo />}
      {account && <WalletInfo />}
      {(screenSize === ScreenSize.Desktop ||
        (screenSize === ScreenSize.Mobile && !currentTransaction)) && (
          <WalletButton />
        )}

      {screenSize === ScreenSize.Mobile && (
        <div onClick={() => dispatch(toggleMenu(!showMenu))}>
          {showMenu ? <CloseIcon /> : <MenuIcon />}
        </div>
      )}
      <Modal
        isShowing={isShowing}
        hide={toggle}>
        <MyAccount />
      </Modal>
    </header>
  );
}

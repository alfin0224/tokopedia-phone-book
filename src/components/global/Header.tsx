import React from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
} from "../global/HeaderElements";
import tokpedLogo from "../../images/tokped-logo.svg";

const Header: React.FC = () => {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/">
              <img
                src={tokpedLogo}
                width="140px"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                alt="tokopedia logo header"
              />
            </NavLogo>
            <MobileIcon>
              <FaBars />
            </MobileIcon>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Header;

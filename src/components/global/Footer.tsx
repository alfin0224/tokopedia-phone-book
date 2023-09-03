import React from "react";
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";
import {
  Container,
  Section,
  ListItem,
  SocialIcons,
  Links,
} from "./FooterElements";
import tokpedLogo from "../../images/tokped-logo.svg";
import appStore from "../../images/app-store.png";
import googlePlay from "../../images/google-play.png";

const Footer: React.FC = () => {
  return (
    <div>
      <hr />
      <Container>
        <Section>
          <ListItem>
            <Links href="/">Beranda</Links>
          </ListItem>
          <ListItem>
            <Links href="/">Kisah Kami</Links>
          </ListItem>
          <ListItem>
            <Links href="/">Bisnis Kami</Links>
          </ListItem>
          <ListItem>
            <Links href="/">Inovasi</Links>
          </ListItem>
        </Section>
        <Section>
          <ListItem>
            <Links href="/">Newsroom</Links>
          </ListItem>
          <ListItem>
            <Links href="/">Karir</Links>
          </ListItem>
          <ListItem>
            <Links href="/">Blog</Links>
          </ListItem>
          <ListItem>
            <Links href="/">Kontak</Links>
          </ListItem>
        </Section>
        <div>
          <img
            src={tokpedLogo}
            width="140px"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            alt="tokopedia logo header"
          />
          <p>Unduh Aplikasi Tokopedia.</p>
          <SocialIcons>
            <a
              href="https://play.google.com/store/apps/details?id=com.tokopedia.tkpd&hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={googlePlay}
                width="110px"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                alt="tokopedia logo header"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/tokopedia-jual-beli-online/id1001394201"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={appStore}
                width="110px"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                alt="tokopedia logo header"
              />
            </a>
          </SocialIcons>
        </div>
      </Container>
      <hr />
      <Container>
        <Section>
          <SocialIcons>
            <FaFacebook style={{ marginRight: "10px" }} size={30} />
            <FaLinkedin style={{ marginRight: "10px" }} size={30} />
            <FaInstagram style={{ marginRight: "10px" }} size={30} />
            <FaYoutube style={{ marginRight: "10px" }} size={30} />
          </SocialIcons>
        </Section>
        <Section></Section>
        <Section>2009 - 2023 PT Tokopedia</Section>
      </Container>
    </div>
  );
};

export default Footer;

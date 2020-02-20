import React from "react";
import Logo from "./Logo";
import NavMain from "./nav/NavMain";
import NavAdmin from "./nav/NavAdmin";
import NavBurger from "./nav/NavBurger";
import IconDashboard from "./icon/IconDashboard";
import SearchBar from "./search/SearchBar";

export default function HeaderMain({ navMobileClbk, searchClbk }) {
  return (
    <header id="header_main">
      <Logo />
      <NavMain />
      <NavAdmin />
      <IconDashboard size="lg" />
      <SearchBar searchClbk={searchClbk} />
      <NavBurger navMobileClbk={navMobileClbk} />
    </header>
  );
}

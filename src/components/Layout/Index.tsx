import { useState } from "react";
import { Outlet } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { SidebarData } from "./SidebarData";
import { LayoutStyled, NavBar, SideBar, SideBarOption } from "./LayoutStyle";

import { IconButtonStyled } from "../Styled/styled";

export default function Layout() {
	const [sidebar, setSidebar] = useState(true);

	const icon = !sidebar ? (
		<MenuIcon className="menuSidebar" />
	) : (
		<MenuOpenIcon className="menuSidebar" />
	);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<LayoutStyled open={sidebar}>
				<NavBar>
					<IconButtonStyled onClick={showSidebar}>{icon}</IconButtonStyled>
				</NavBar>
				<Outlet />
			</LayoutStyled>

			<SideBar open={sidebar}>
				<ul>
					{SidebarData.map((val, key) => {
						return (
							<a key={key} href={val.link}>
								<SideBarOption>
									<val.icon />
									{val.title}
								</SideBarOption>
							</a>
						);
					})}
				</ul>
			</SideBar>
		</>
	);
}

import { styled } from "@mui/material";

export interface StyledProps {
	open: boolean;
}

export const LayoutStyled = styled("div")(({ open = false }: StyledProps) => ({
	width: open ? "calc(100% - 14rem)" : "100%",
	height: "100vh",
	background: "var(--gradient)",
	marginLeft: open ? "14rem" : "",
	transition: "all 500ms",

	"& .outlet": {
		width: open ? "calc(100% - 14rem)" : "100%",
		transition: "all 500ms",
	},
	"& .EnabledDeliveriesPage .RegisterDeliveriesPage": {
		display: "none",
	},
	"& .EnabledRegisterPage  .DeliveriesPage": {
		display: "none",
	},
}));

export const NavBar = styled("nav")(() => ({
	height: "6rem",
	paddingInline: "2rem",

	display: "flex",
	justifyContent: "space-between",
	flexDirection: "row",
	alignItems: "center",

	backgroundColor: "var(--off-white)",
	boxShadow: "var(--shadow)",
	overflow: "hidden",
	"& .menuSidebar": {
		position: "relative",
		left: "0rem",

		fontSize: "3.2rem",
		color: "var(--main-color)",
	},
}));

export const SideBar = styled("div")(({ open = false }: StyledProps) => ({
	width: "14rem",
	height: "100%",
	paddingTop: "9rem",

	position: "fixed",
	top: 0,

	background: "var(--main-color)",

	left: open ? "0" : "-140px",
	transition: "all 500ms",

	"& a": {
		textDecoration: "none",
		color: "white",
	},
}));

export const SideBarOption = styled("li")(() => ({
	fontSize: " 1.2rem",
	fontWeight: 600,
	padding: "1rem",

	display: "flex",
	alignItems: "center",
	gap: "0.5rem",

	cursor: "pointer",
	"& svg": {
		fill: "white",
		fontSize: " 3.2rem",
	},
	"&:hover": {
		backgroundColor: "var(--main-dark)",
	},
}));

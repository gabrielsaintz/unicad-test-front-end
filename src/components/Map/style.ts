import { styled } from "@mui/system";

export const MapDialog = styled("div")(() => ({
	display: "flex",
	width: "100%",
	height: "100%",
	padding: "3rem 0rem 10rem 3rem",

	background: "rgba(0, 0, 0, 0.3)",
	backdropFilter: "blur(4px)",
	position: "fixed",
	zIndex: 10,
}));

export const Address = styled("div")(() => ({
	width: "240px",
	marginLeft: "-120px",
	marginTop: "12px",
	padding: "12px",

	display: "flex",
	flexDirection: "column",
	justifyContent: "center",

	backgroundColor: "rgba(255, 255, 255, 0.95)",
	borderRadius: "4px",
	boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
	fontSize: "14px",
	position: "absolute",
	left: "50%",
}));

export const DeliveryInfo = styled("div")(() => ({
	fontSize: "1.2rem",
	fontWeight: "500",
	color: "grey",

	"& p": {
		fontSize: "1.4rem",
		fontWeight: "600",
		color: "var(--main-color)",
	},
}));

import { styled } from "@mui/material";

export const boxStyle = {
	width: "100%",
	padding: "3rem ",
	marginTop: "2rem",

	display: "flex",
	flexDirection: "column",
	gap: "2rem",

	backgroundColor: "white",
	borderRadius: "1rem",
	boxShadow: "var(--shadow)",
};

export const PositionForm = styled("div")(() => ({
	width: "100%",
	padding: "3rem",

	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",

	"& h1": {
		fontSize: "2.6rem",
		color: "var(--main-color)",
	},
}));

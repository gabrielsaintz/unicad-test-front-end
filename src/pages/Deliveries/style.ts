import { styled, TableCell, TableContainer } from "@mui/material";

export const PositionTable = styled(TableContainer)(() => ({
	width: "100%",
	height: "100%",
	padding: "3rem 3rem 10rem 3rem",
}));

export const tableStyle = {
	backgroundColor: "white",
	borderRadius: "1rem",
	boxShadow: "var(--shadow)",

	"& th, tr, td": {
		fontFamily: `"Montserrat", sans-serif`,
		fontSize: " 1.4rem",
	},
};

export const Lineone = styled(TableCell)(() => ({
	fontWeight: "600",
	color: "var(--main-color)",
}));

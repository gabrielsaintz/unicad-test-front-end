import { Button, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const TextFieldStyled = styled(TextField)(() => ({
	width: "100%",
	marginBlock: "5px",

	"& input": {
		height: "1rem",
		fontFamily: `"Montserrat", sans-serif`,
		fontWeight: "500",
		fontSize: "1.6rem",
	},
}));

export const IconButtonStyled = styled(IconButton)(() => ({
	width: "fit-content",
	height: "fit-content",
}));

export const ButtonStyled = styled(Button)(() => ({
	width: "100%",
	height: "4rem",

	fontFamily: `"Montserrat", sans-serif`,
	fontSize: "1.4rem",
	fontWeight: "600",
	textTransform: "none",
}));

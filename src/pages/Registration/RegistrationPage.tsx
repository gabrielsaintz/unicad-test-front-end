import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import Map from "../../components/Map/Index";

import { Close, Room } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Snackbar } from "@mui/material";

import {
	ButtonStyled,
	IconButtonStyled,
	TextFieldStyled,
} from "../../components/Styled/styled";
import { boxStyle, PositionForm } from "./style";
import { Values } from "./RegistrationInterface";
import { api } from "../../services/api";
import { MapDialog } from "../../components/Map/style";

export default function RegistrationPage() {
	const [values, setValues] = useState<Values>({
		name: "",
		date: "",
	});

	const [buttonState, setButtonState] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [isSendingDelivery, setIsSendingDelivery] = useState(false);

	const [starPoint, setStartingPoint] = useState<google.maps.LatLngLiteral>();
	const [destPoint, setDestPoint] = useState<google.maps.LatLngLiteral>();
	const [startAddressName, setStartAddressName] = useState("");
	const [destAddresName, setDestAdressName] = useState("");

	const [openMap, setOpenMap] = useState(false);

	useEffect(() => {
		if (values.name.length < 8 || values.date.length < 10) {
			setButtonState(true);
		}

		if (values.name.length > 5 && values.date.length >= 10) {
			setButtonState(false);
		}
	}, [values]);

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnackbar(false);
	};

	console.log(values.date.length, values.name.length);

	const handleChange =
		(prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value });
		};

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (startAddressName.length < 3 || destAddresName.length < 3) {
			return setOpenSnackbar(true);
		}

		setIsSendingDelivery(true);
		setButtonState(true);

		await api.post("/createdelivery", {
			data: {
				name: values.name,
				delivery_date: values.date,
				start_address_name: startAddressName,
				start_coordinates: JSON.stringify(starPoint),
				dest_addres_name: destAddresName,
				destiny_coordinates: JSON.stringify(destPoint),
			},
		});

		console.log(isSendingDelivery);

		setIsSendingDelivery(false);
		setButtonState(false);
	}

	const showMap = () => {
		console.log(
			values.name,
			values.date,
			starPoint,
			destPoint,
			startAddressName,
			destAddresName
		);
		setOpenMap(!openMap);
	};

	const map = !openMap ? (
		<></>
	) : (
		<MapDialog className="outlet EnabledRegisterPage">
			<Map
				closeDialogMap={showMap}
				setDestAddress={setDestAdressName}
				setStartAddress={setStartAddressName}
				setStartPoint={setStartingPoint}
				setDestPoint={setDestPoint}
				initialAddressName={""}
				secondAddressName={""}
				initialCoordinates={null}
				destinationCoordinates={null}
			/>
			<IconButtonStyled onClick={showMap}>
				<Close />
			</IconButtonStyled>
		</MapDialog>
	);

	const action = (
		<>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
				<Close fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<>
			{map}

			<PositionForm>
				<h1>Cadastrar Entrega</h1>
				<Box
					component="form"
					sx={boxStyle}
					noValidate
					autoComplete="off"
					onSubmit={handleSubmit}
				>
					<TextFieldStyled
						onChange={handleChange("name")}
						placeholder="Nome do Cliente"
					/>
					<TextFieldStyled onChange={handleChange("date")} type="date" />
					<TextFieldStyled
						placeholder="Ponto de partida"
						disabled
						value={startAddressName}
					/>
					<TextFieldStyled
						placeholder="Ponto de destino"
						disabled
						value={destAddresName}
					/>

					<ButtonStyled onClick={showMap} variant="outlined">
						Definir destino entrega
						<Room />
					</ButtonStyled>

					<ButtonStyled disabled={buttonState} type="submit" variant="contained">
						{isSendingDelivery ? (
							<CircularProgress size={20} color="inherit" />
						) : (
							"CADASTRAR ENTREGA"
						)}
					</ButtonStyled>
				</Box>
			</PositionForm>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={20000}
				onClose={handleClose}
				message="Destino da entrega inválido"
				action={action}
				ContentProps={{
					style: {
						fontSize: "1.6rem",
						backgroundColor: "#f64529",
					},
				}}
			/>
		</>
	);
}

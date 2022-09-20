import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import Map from "../../components/Map/Index";

import { Close, Room } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Snackbar } from "@mui/material";
import { format } from "date-fns";

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

	const [valuesSnackBar, setValuesSnackBar] = useState({
		menssage: "",
		color: "",
		time: 0,
	});

	const [validateName, setValidadeName] = useState({
		validName: false,
		message: "",
	});

	const [buttonState, setButtonState] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [isSendingDelivery, setIsSendingDelivery] = useState(false);
	const [newDate, setNewDate] = useState("");

	const [starPoint, setStartingPoint] = useState<google.maps.LatLngLiteral>();
	const [destPoint, setDestPoint] = useState<google.maps.LatLngLiteral>();
	const [startAddressName, setStartAddressName] = useState("");
	const [destAddresName, setDestAdressName] = useState("");

	const [openMap, setOpenMap] = useState(false);
	const regex = /[0-9]/;

	useEffect(() => {
		setNewDate(format(new Date(), "yyyy-MM-dd"));

		if (values.name.length >= 4 && values.date.length >= 10 && !regex.test(values.name)) {
			setValidadeName({
				validName: false,
				message: "",
			});
			setButtonState(false);
		}

		if (regex.test(values.name)) {
			setValidadeName({
				validName: true,
				message: "O nome não pode conter caracteres do tipo numérico",
			});
			setButtonState(true);
		}

		if (startAddressName.length < 1 || destAddresName.length < 1) {
			setButtonState(true);
		}

		if (values.name.length < 4 || values.date.length < 10) {
			setButtonState(true);
		}
	}, [newDate, values, startAddressName]);

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnackbar(false);
	};

	const handleChange =
		(prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({
				...values,
				[prop]: event.target.value,
			});
			if (prop === "name" && event.target.value.length) {
				setValidadeName({
					validName: event.target.value.length < 4,
					message: event.target.value.length < 4 ? "O nome deve conter no minimo 4" : "",
				});
			}
		};

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

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

		setIsSendingDelivery(false);
		setButtonState(false);

		setValuesSnackBar({
			menssage: "Entrega cadastrada com sucesso.",
			color: "var(--main-light)",
			time: 2000,
		});

		setValues({
			name: "",
			date: "",
		});

		setStartAddressName("");
		setDestAdressName("");
		setOpenSnackbar(true);
	}

	const showMap = () => {
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
			<IconButtonStyled className="closeMap" onClick={showMap}>
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
					<label>
						Nome do cliente :
						<TextFieldStyled
							type="text"
							helperText={validateName.message}
							error={validateName.validName}
							value={values.name}
							onChange={handleChange("name")}
							placeholder="Digite o nome do cliente"
						/>
					</label>
					<label>
						Data da entrega :
						<TextFieldStyled
							helperText={values.date.length < 10 ? "Defina uma data" : ""}
							value={values.date}
							onChange={handleChange("date")}
							type="date"
							inputProps={{
								min: newDate,
								max: "2022-12-31",
							}}
						/>
					</label>
					<label>
						Ponto de partida :
						<TextFieldStyled
							onClick={showMap}
							placeholder="Ponto de partida"
							disabled
							value={startAddressName}
						/>
					</label>
					<label>
						Ponto de destino :
						<TextFieldStyled
							onClick={showMap}
							placeholder="Ponto de destino"
							disabled
							value={destAddresName}
						/>
					</label>

					<ButtonStyled onClick={showMap} variant="outlined">
						<Room />
						Clique para definir PONTO DE PARTIDA e PONTO DE ENTREGA
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
				autoHideDuration={valuesSnackBar.time}
				onClose={handleClose}
				message={valuesSnackBar.menssage}
				action={action}
				ContentProps={{
					style: {
						fontSize: "1.6rem",
						backgroundColor: valuesSnackBar.color,
					},
				}}
			/>
		</>
	);
}

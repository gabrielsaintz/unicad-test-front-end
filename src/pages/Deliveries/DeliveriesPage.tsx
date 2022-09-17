import { SyntheticEvent, useEffect, useState } from "react";
import { api } from "../../services/api";

import Map from "../../components/Map/Index";
import { DeliveriesData } from "./DeliveriesData";

import {
	IconButton,
	Snackbar,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material/";
import { Close, Delete, Route } from "@mui/icons-material";

import { PositionTable, Lineone, tableStyle } from "./style";
import { MapDialog } from "../../components/Map/style";
import { IconButtonStyled } from "../../components/Styled/styled";

export default function DeliveriesPage() {
	const [openMap, setOpenMap] = useState(false);

	const [deliveries, setDeliveries] = useState([]);

	const [starPoint, setStartingPoint] = useState<google.maps.LatLngLiteral>();
	const [destPoint, setDestPoint] = useState<google.maps.LatLngLiteral>();
	const [startAddressName, setStartAddressName] = useState("");
	const [destAddresName, setDestAdressName] = useState("");

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [isDeletingDelivery, setIsDeletingDelivery] = useState(false);

	useEffect(() => {
		const getDeliveries = async () => {
			const response = await api.get("/getdeliveries");
			setDeliveries(response.data);
		};
		getDeliveries();
	}, [deliveries]);

	const DeleteDelivery = async (value?: DeliveriesData) => {
		setIsDeletingDelivery(true);
		const response = await api.delete("/deletedelivery", {
			data: {
				id: value?.id,
			},
		});
		setIsDeletingDelivery(false);
		setOpenSnackbar(true);
	};

	const showMap = (value?: DeliveriesData) => {
		if (value) {
			setStartAddressName(value.start_address_name);
			setDestAdressName(value.dest_addres_name);
			setStartingPoint(value.start_coordinates);
			setDestPoint(value.destiny_coordinates);
		}
		setOpenMap(!openMap);
	};

	const map = !openMap ? (
		<></>
	) : (
		<MapDialog className="outlet EnabledDeliveriesPage">
			<Map
				closeDialogMap={() => {}}
				setStartAddress={setStartAddressName}
				setDestAddress={setDestAdressName}
				setStartPoint={setStartingPoint}
				setDestPoint={setDestPoint}
				initialAddressName={startAddressName}
				secondAddressName={destAddresName}
				initialCoordinates={starPoint}
				destinationCoordinates={destPoint}
			/>
			<IconButtonStyled className="closeMap" onClick={() => showMap()}>
				<Close />
			</IconButtonStyled>
		</MapDialog>
	);

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnackbar(false);
	};

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
			<PositionTable>
				<Table sx={tableStyle} size="medium" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<Lineone align="left">Nome</Lineone>

							<Lineone align="left">Ponto de partida</Lineone>
							<Lineone align="left">Ponto de destino</Lineone>
							<Lineone align="left">Data da entrega</Lineone>
							<Lineone align="center">Rota</Lineone>
						</TableRow>
					</TableHead>
					<TableBody>
						{deliveries.map((value: DeliveriesData, key) => (
							<TableRow key={key}>
								<TableCell align="left" component="th" scope="row">
									{value.name}
								</TableCell>
								<TableCell align="left">{value.start_address_name}</TableCell>
								<TableCell align="left">{value.dest_addres_name}</TableCell>
								<TableCell align="left">{value.delivery_date}</TableCell>
								<TableCell align="center">
									<IconButton
										onClick={() => {
											showMap(value);
										}}
									>
										<Route fontSize="large" />
									</IconButton>
									<IconButton
										onClick={() => {
											DeleteDelivery(value);
										}}
										disabled={isDeletingDelivery}
									>
										<Delete fontSize="large" />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</PositionTable>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={handleClose}
				message="Registro de entrega deletado com sucesso"
				action={action}
				ContentProps={{
					style: {
						fontSize: "1.6rem",
						backgroundColor: "var(--main-light)",
					},
				}}
			/>
		</>
	);
}

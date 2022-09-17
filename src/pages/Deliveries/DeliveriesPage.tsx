import { useEffect, useState } from "react";
import { api } from "../../services/api";

import Map from "../../components/Map/Index";
import { DeliveriesData } from "./DeliveriesData";

import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material/";
import { PositionTable, Lineone, tableStyle } from "./style";
import { Close, Route } from "@mui/icons-material";
import { MapDialog } from "../../components/Map/style";
import { IconButtonStyled } from "../../components/Styled/styled";

export default function DeliveriesPage() {
	const [openMap, setOpenMap] = useState(false);

	const [deliveries, setDeliveries] = useState([]);

	const [starPoint, setStartingPoint] = useState<google.maps.LatLngLiteral>();
	const [destPoint, setDestPoint] = useState<google.maps.LatLngLiteral>();
	const [startAddressName, setStartAddressName] = useState("");
	const [destAddresName, setDestAdressName] = useState("");

	useEffect(() => {
		const getDeliveries = async () => {
			const response = await api.get("/getdeliveries");
			setDeliveries(response.data);
		};
		getDeliveries();
	}, []);

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
			<IconButtonStyled onClick={() => showMap()}>
				<Close />
			</IconButtonStyled>
		</MapDialog>
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
							<Lineone align="right">Rota</Lineone>
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
								<TableCell align="right">
									<IconButton
										onClick={() => {
											showMap(value);
										}}
									>
										<Route />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</PositionTable>
		</>
	);
}

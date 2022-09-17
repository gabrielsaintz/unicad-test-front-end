import { memo, SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
	GoogleMap,
	Marker,
	StandaloneSearchBox,
	DirectionsService,
	DirectionsRenderer,
	useJsApiLoader,
} from "@react-google-maps/api";

import { ButtonStyled, TextFieldStyled } from "../Styled/styled";
import { Address, DeliveryInfo } from "./style";
import { Libraries, MapProps } from "./MapProps";
import { IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

const containerStyle = {
	width: "100%",
	height: "100%",
};

const position = {
	lat: -7.260780199999999,
	lng: -34.9078219,
};

const libraries: Libraries = ["places"];

function Map({
	initialAddressName,
	secondAddressName,
	setStartPoint,
	setDestPoint,
	setStartAddress,
	setDestAddress,
	closeDialogMap,
	initialCoordinates,
	destinationCoordinates,
}: MapProps) {
	const [map, setMap] = useState<google.maps.Map | null>();
	const [searchBoxA, setSearchBoxA] = useState<google.maps.places.SearchBox>();
	const [searchBoxB, setSearchBoxB] = useState<google.maps.places.SearchBox>();
	const [pointA, setPointA] = useState<google.maps.LatLngLiteral | null>();
	const [pointB, setPointB] = useState<google.maps.LatLngLiteral | null>();
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const [startAdressName, setStartAdressName] = useState("");
	const [destAddressName, setDestAddressName] = useState("");

	const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>();
	const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>();

	const [response, setResponse] = useState<google.maps.DistanceMatrixResponse | null>();

	const onMapLoad = (map: google.maps.Map) => {
		setMap(map);
	};

	const onLoad = (ref: google.maps.places.SearchBox, value: String) => {
		if (value === "a") {
			setSearchBoxA(ref);
		}
		if (value === "b") {
			setSearchBoxB(ref);
		}
	};

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	const onPlacesChanged = (value: String) => {
		const SearchBox = value === "a" ? searchBoxA : searchBoxB;

		const places = SearchBox!.getPlaces();
		const place = places![0];

		const location = {
			lat: place?.geometry?.location?.lat() || 0,
			lng: place?.geometry?.location?.lng() || 0,
		};

		if (value === "a") {
			setPointA(location);
			setStartAdressName(String(place.formatted_address));
		}

		if (value === "b") {
			setPointB(location);
			setDestAddressName(String(place.formatted_address));
		}

		setOrigin(null);
		setDestination(null);
		setResponse(null);

		map?.panTo(location);
	};

	useEffect(() => {
		autoTraceRoute();
	}, []);

	const autoTraceRoute = () => {
		setOrigin(initialCoordinates);
		setDestination(destinationCoordinates);
	};

	const traceRoute = () => {
		if (pointA && pointB) {
			setOrigin(pointA);
			setDestination(pointB);

			setStartPoint(pointA);
			setDestPoint(pointB);

			setStartAddress(startAdressName);
			setDestAddress(destAddressName);
		}
	};

	const directionsServiceOptions = useMemo<any>(() => {
		return {
			origin: origin,
			destination: destination,
			travelMode: "DRIVING",
		};
	}, [origin, destination]);

	const directionsCallback = useCallback((res: any) => {
		if (res !== null && res.status === "OK") {
			setResponse(res);
			closeDialogMap();
		} else {
			setStartAddress("");
			setDestAddress("");
			setOpenSnackbar(true);
			console.log(res);
		}
	}, []);

	const directionsRendererOptions = useMemo<any>(() => {
		return {
			directions: response,
		};
	}, [response]);

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

	return isLoaded ? (
		<GoogleMap
			onLoad={onMapLoad}
			mapContainerStyle={containerStyle}
			center={position}
			zoom={15}
		>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={2000}
				onClose={handleClose}
				message="Destino da entrega inválido"
				action={action}
				ContentProps={{
					style: {
						fontSize: "1.6rem",
						backgroundColor: "#f64529",
						margin: "10rem",
					},
				}}
			/>

			<Address>
				<DeliveryInfo className="DeliveriesPage">
					Ponto de Partida:
					<p>{initialAddressName}</p>
					Ponto de Destino:
					<p>{secondAddressName}</p>
				</DeliveryInfo>

				<StandaloneSearchBox
					onLoad={(ref) => onLoad(ref, "a")}
					onPlacesChanged={() => onPlacesChanged("a")}
				>
					<TextFieldStyled
						className="RegisterDeliveriesPage"
						placeholder="Ponto de partida"
					/>
				</StandaloneSearchBox>
				<StandaloneSearchBox
					onLoad={(ref) => onLoad(ref, "b")}
					onPlacesChanged={() => onPlacesChanged("b")}
				>
					<TextFieldStyled
						className="RegisterDeliveriesPage"
						placeholder="Ponto de destino"
					/>
				</StandaloneSearchBox>

				<ButtonStyled
					className="RegisterDeliveriesPage"
					variant="contained"
					onClick={() => {
						traceRoute();
					}}
				>
					Definir Rota de entrega
				</ButtonStyled>
			</Address>

			{!response && pointA && <Marker position={pointA} />}
			{!response && pointB && <Marker position={pointB} />}

			{origin && destination && (
				<DirectionsService
					options={directionsServiceOptions}
					callback={directionsCallback}
				/>
			)}

			{response && directionsRendererOptions && (
				<DirectionsRenderer options={directionsRendererOptions} />
			)}
		</GoogleMap>
	) : (
		<></>
	);
}

export default memo(Map);

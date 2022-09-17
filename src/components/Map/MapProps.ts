export interface MapProps {
	setStartPoint: Function;
	setDestPoint: Function;
	setStartAddress: Function;
	setDestAddress: Function;
	closeDialogMap: any;
	initialAddressName: string;
	secondAddressName: string;
	initialCoordinates: google.maps.LatLngLiteral | null | undefined;
	destinationCoordinates: google.maps.LatLngLiteral | null | undefined;
}

export type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];

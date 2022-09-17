export interface DeliveriesData {
	id: Number;
	name: string;
	delivery_date: string;
	start_address_name: string;
	dest_addres_name: string;
	start_coordinates: google.maps.LatLngLiteral;
	destiny_coordinates: google.maps.LatLngLiteral;
}

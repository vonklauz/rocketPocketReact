export const countEstateTypeSalePrice = (estateType, costPrice) => {
	
	if(!estateType.area) {
		return '0';
	}
	
	else{
		return ((costPrice / 100 * (estateType.markup || 0)) + +costPrice).toFixed(0)
	}
}
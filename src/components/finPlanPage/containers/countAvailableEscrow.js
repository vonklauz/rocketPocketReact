export const countAvailableEscrow = (salesChangesArr, percentOfSales) => {
	if(percentOfSales > 100) percentOfSales = 100
	return salesChangesArr.map ( monthSalesSum => monthSalesSum / 100 * (percentOfSales || 0));
}

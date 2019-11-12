import React from 'react';
import {Line} from 'react-chartjs-2';

const ChartComponent = ({chartData, children}) => (
	<div className='fin-plan_page_chart_and_menu_wrapper'>
		<div className='fin-plan_page_chart'>
			<Line
				data={chartData}
				width={768}
				height={550}
				options={
					{	
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}]
						},
						maintainAspectRatio: false
					}
				}/>
		</div>
		<div className='fin-plan_page_chart_menu'>
			{children}
		</div>
	</div>
);

export default ChartComponent;
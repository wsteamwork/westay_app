'use strict';
import React, {FC, useEffect, memo} from 'react';
import {
	View
}             from 'react-native';
import Day    from './Day';

interface IProps {
	dayProps: any,
	days: any,
	onSelectDate: () => any,
}

const DayRow: FC<IProps> = (props) => {
  const {dayProps, days, onSelectDate } = props;

	useEffect(() => {}, [days]);

  return (
		<View style={{ marginBottom: 2, marginTop: 2, flexDirection: 'row' }}>
			{
				days.map((day:any, i:number) => {
					return (
						<Day key={i} dayProps={dayProps} onSelectDate={onSelectDate} day={day}/>
					)
				})
			}
		</View>
  );
};

const areEqual=(prevProps:IProps, nextProps:any)=> {
	return nextProps.days === prevProps.days
};

export default memo(DayRow, areEqual);

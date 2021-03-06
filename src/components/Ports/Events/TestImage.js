import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 230,
		height: 400,
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	titleBar: {
		cursor: "pointer",
		background:
			'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	icon: {
		color: 'white',
	},
}));

export const TestImage = () => {
	const classes = useStyles();
	const {selectedObjects: {camera, event}} = useSelector(state => state.ports);
	const {SelectedImageVisibleAction, SelectedShipImageIdAction} = useActions();

	const [data, setData] = useState(camera.events);

	useEffect(() => {
		typeof event.id !== "undefined"
			? setData(camera.events.filter(item => item.typeVessel === event.typeVessel))
			: setData(camera.events);
	}, [event, camera]);

	// const boatImage = data.map((tile) => {
	const boatImage = data.map(({id, imageLink, typeVessel}) => {
		return (
			<GridListTile key={id} cols={2} rows={2}
			              onClick={() => {
				              SelectedShipImageIdAction(id);
				              SelectedImageVisibleAction(true);
			              }}
			>
				<img
					style={{cursor: 'pointer'}}
					src={imageLink} alt={typeVessel}
				/>
				<GridListTileBar
					className={classes.titleBar}
					title={typeVessel}
					titlePosition="top"
					actionPosition="left"
				/>
			</GridListTile>
		)
	});

	return (
		<div className={classes.root}>
			<GridList cellHeight={70} spacing={1} className={classes.gridList}>
				{boatImage}
			</GridList>
		</div>
	);
}
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Icon} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import {NavLink, useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

export const SimpleList = () => {
	const {data, portIcon, cameraIcon, selectedObjects} = useSelector(state => state.ports);
	const {portsNewNote, camerasNewNote} = useSelector(state => state.header);
	const {
		SelectedPortAction, SelectedCameraAction,
	} = useActions();

	const [allData, setAllData] = useState(data)
	const [notes, setNotes] = useState(data.map(() => 0));
	const [icon, setIcon] = useState();

	const classes = useStyles();
	const history = useHistory();

	const changeDataPorts = (i) => {
		SelectedPortAction(i);
		SelectedCameraAction(0);
	}

	const changeDataCamera = (i) => {
		SelectedCameraAction(i);
		history.push('/events');
	}

	const setData = (data, note, icon) => {
		setAllData(data);
		setNotes(note);
		setIcon(icon);
	}

	useEffect(() => {
		const {id, cameras} = selectedObjects.port;
		const portId = Number.isInteger(id);

		portId
			? setData(cameras.data, camerasNewNote, cameraIcon.drawer)
			: setData(data, portsNewNote, portIcon.drawer);
	}, [selectedObjects.port]);

	const camData = allData.map(({id, link, description}, i) => {
		const portId = Number.isInteger(selectedObjects.port.id);

		return (
			<div key={id}>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button
					          onClick={() => portId ? changeDataCamera(i) : changeDataPorts(i)}
					>
						<ListItemIcon>
							<Icon>
								<img src={icon} height={25} width={25} alt=""/>
							</Icon>
						</ListItemIcon>
						<ListItemText primary={description}/>

						<IconButton aria-label="show 17 new notifications" color="default">
							<Badge badgeContent={notes[i]} color="secondary">
								<NavLink to="/events">
									<NotificationsIcon/>
								</NavLink>
							</Badge>
						</IconButton>
					</ListItem>
				</List>
				<Divider/>
			</div>
		)
	});

	return (
		<div className={classes.root}>
			{camData}
		</div>
	);
}
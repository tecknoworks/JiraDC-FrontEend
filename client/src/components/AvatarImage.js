import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    avatarImg: {
        height: props => props.size ? props.size : 48,
        width: props => props.size ? props.size : 48,
        backgroundImage: props => `url('${props.src}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        borderColor: theme.palette.primary.main,
        borderWidth: 4,
        borderStyle: 'solid'
    }
}));

export function AvatarImage(props) {
    const classes = useStyles(props);

    return (
        <div className={classes.avatarImg}></div>
    )
}
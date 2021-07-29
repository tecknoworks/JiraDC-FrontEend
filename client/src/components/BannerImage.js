import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    bannerImg: {
        minHeight: 380,
        width: '100%',
        backgroundImage: props => `url('${props.src}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
}));

export function BannerImage(props) {
    const classes = useStyles(props);

    return (
        <div>
            <div className={classes.bannerImg}></div>
        </div>
    )
}
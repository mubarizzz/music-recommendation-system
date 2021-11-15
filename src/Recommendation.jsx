import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';


function Recommendation(props) {
    return (
        <div>
            <h1>{props.name.map((user) => (
        <div className="user">{user}</div>
      ))}</h1>
        </div>
    )
}

export default Recommendation

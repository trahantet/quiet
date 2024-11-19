import React from 'react'

import { styled } from '@mui/material/styles'

import { Grid, Typography } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'

const PREFIX = 'MessagesDivider'

const classes = {
  root: `${PREFIX}root`,
  divider: `${PREFIX}divider`, // this is the line pre and post
  titleDiv: `${PREFIX}titleDiv`, // this is the date itself
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: 0,
    position: 'sticky',
    top: '0rem',
    zIndex: 100,
  },

  [`& .${classes.divider}`]: {
    height: 1,
    backgroundColor: theme.palette.colors.border01,
  },

  [`& .${classes.titleDiv}`]: {
    paddingLeft: 12,
    paddingRight: 12,
  },
}))

interface MessagesDividerProps {
  title: string
}

export const MessagesDivider: React.FC<MessagesDividerProps> = ({ title }) => {
  return (
    // this works for styling but I'm not sure that its the best code practice
    <StyledGrid container justifyContent='center' alignItems='center' position='sticky' top='0' zIndex='100'>
      <Grid item xs>
        <div className={classes.divider} />
      </Grid>
      <Grid item className={classes.titleDiv}>
        <Typography variant='body1'>{title}</Typography>
      </Grid>
      <Grid item xs>
        <div className={classes.divider} />
      </Grid>
    </StyledGrid>
  )
}

export default MessagesDivider

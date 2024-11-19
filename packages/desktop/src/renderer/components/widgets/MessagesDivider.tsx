import React from 'react'

import { styled } from '@mui/material/styles'

import { Grid, Typography } from '@mui/material'

const PREFIX = 'MessagesDivider'

const classes = {
  root: `${PREFIX}root`,
  divider: `${PREFIX}divider`, // this is the line pre and post
  titleDiv: `${PREFIX}titleDiv`, // this is the date itself
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: 0,
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
    <StyledGrid container justifyContent='center' alignItems='center' position='sticky'>
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

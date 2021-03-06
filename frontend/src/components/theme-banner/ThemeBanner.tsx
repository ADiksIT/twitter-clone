import React, { FC } from 'react'
import classes from './theme-banner.module.scss'
import { IconButton } from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'

type Props = {
  actual: string,
  theme: string,
  popularity?: string,
  counter?: number,
}

export const ThemeBanner: FC<Props> = ({
  actual,
  theme,
  popularity,
  counter,
}) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <span className={classes.actual}>Актуальные темы: {actual}</span>
      <IconButton className={classes.iconBtn} style={{ padding: '3px' }}>
        <ExpandMoreRounded color="primary" fontSize={'small'} />
      </IconButton>
    </div>

    <span className={classes.theme}>{theme}</span>
    {popularity ? (
      <span className={classes.popilarityFor}>Популярно: {popularity}</span>
    ) : (
      ''
    )}
    {counter ? <span className={classes.counter}>Твитов: {counter}</span> : ''}
  </div>
)

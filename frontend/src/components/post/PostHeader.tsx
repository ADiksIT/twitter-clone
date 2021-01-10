import React from 'react'
import classes from './post.module.scss'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'

const getDate = (date: Date): string => {
  const day = new Date(Date.now()).getDate() - new Date(date).getDate()
  return day === 0 ? 'today' : `${day} day ago`
}

interface IProps {
  createdAt: Date
  author: { userName: string, avatarUrl: string }
}

export const PostHeader: React.FC<IProps> = ({ author, createdAt }) => {
  return (
    <div className={classes.postHeader}>
        <span>
          <strong>{author.userName}</strong>
          <Link
            className={classes.userTag}
            to={`profile/${author.userName}`}
          >
            {`@${author.userName}`}
          </Link>
          <span className={classes.date}>
            <span style={{ marginRight: '5px' }}>{'\u2022'}</span>
            {getDate(createdAt)}
          </span>
        </span>
      <IconButton className={classes.iconBtn} style={{ padding: '2px' }}>
        <ExpandMoreRounded fontSize="small" color="primary"/>
      </IconButton>
    </div>
  )
}

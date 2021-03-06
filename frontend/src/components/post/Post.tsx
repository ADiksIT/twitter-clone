import React, { FC } from 'react'
import {
  FavoriteBorderOutlined,
  InsertCommentOutlined,
  RepeatOutlined,
  SystemUpdateAltOutlined,
} from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { PostContainer } from '../post-container/PostContainer'
import { PostButton } from './PostButton'
import classes from './post.module.scss'
import { PostPhotoSlider } from './PostPhotoSlider'
import { PostHeader } from './PostHeader'
import { IPost, IPostAuthor } from '../../interfaces/IPost'

// todo later, this is a temporary solution
const PostButtons = ({loading}: {loading: boolean}) => (
  <>
    <PostButton
      loading={loading}
      content="3,3 тыс"
      icon={<InsertCommentOutlined fontSize="small" color="primary"/>}
      className={classes.btnAction}
    />
    <PostButton
      icon={<RepeatOutlined fontSize="small" color="primary"/>}
      content="30 тыс"
      loading={loading}
      className={classes.btnAction}
    />
    <PostButton
      icon={<FavoriteBorderOutlined fontSize="small" color="primary"/>}
      content="300"
      loading={loading}
      className={classes.btnAction}
    />
  </>
)

interface IProps {
  post: IPost
  author: IPostAuthor
}

//todo avatar
export const Post: FC<IProps> = ({ post, author }) => (
    <div className={classes.container}>
      <PostContainer imgSrc={'api/post/img/minify/' + author.userName + '.jpeg'} loading={false}>
        <PostHeader author={author} createdAt={post.createdAt}/>
        <p className={classes.postDescription}>{post.text}</p>
        {post.media && post.media.length > 0 && <PostPhotoSlider media={post.media}/>}
        <div className={classes.wrapBtn}>
          <PostButtons loading={false}/>
          <IconButton className={classes.iconBtn}>
            <SystemUpdateAltOutlined fontSize="small" color="primary"/>
          </IconButton>
        </div>
      </PostContainer>
    </div>
  )

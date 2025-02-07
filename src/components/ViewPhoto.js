import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined'
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { experimental_sx as sx, styled } from '@mui/system'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPhotoById } from '../redux/reducers/photos'
import { selectPhotoViewing_id, uiActions } from '../redux/reducers/ui'

// when you click photo in home page, you can see photo you clicked in fullscreen panel
const ViewPhoto = () => {

  const [transform, setTransform] = useState({
    scale: 1,
  })

  const photoViewing_id = useSelector((state) => selectPhotoViewing_id(state))

  const selectedPhoto = useSelector((state) =>
    selectPhotoById(state, photoViewing_id)
  )

  const isOpen = useMemo(() => Boolean(photoViewing_id), [photoViewing_id])

  const dispatch = useDispatch()

  const handleClickOutside = () => {
    dispatch(uiActions.setPhotoViewing_id(null))
  }

  const handleZoomInBtnClick = () => {
    setTransform({ ...transform, scale: transform.scale + 0.1 })
  }

  const handleZoomOutBtnClick = () => {
    setTransform({ ...transform, scale: transform.scale - 0.1 })
  }

  if (!isOpen) return null

  return (
    <StyledWrapper onClick={handleClickOutside}>

      <StyledPhoto
        component='img'
        src={selectedPhoto.url}
        onClick={(e) => e.stopPropagation()}
        transform={`translate(-50%, -50%) scale(${transform.scale})`}
      />

      <StyledButtonsWrapper onClick={(e) => e.stopPropagation()}>

        <IconButton sx={{ color: 'white' }} onClick={handleZoomInBtnClick}>
          <ZoomInOutlinedIcon />
        </IconButton>

        <IconButton sx={{ color: 'white' }} onClick={handleZoomOutBtnClick}>
          <ZoomOutOutlinedIcon />
        </IconButton>

      </StyledButtonsWrapper>
      
    </StyledWrapper>
  )
}

const StyledWrapper = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    bgcolor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 'modal',
  })
)

const StyledPhoto = styled(Box)(({theme}) =>
  theme.unstable_sx({
    position: 'absolute',
    left: '50%',
    top: '50%',
    // transform: props.transform,
  })
)

const StyledButtonsWrapper = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    border: '1px solid white',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
  })
)

export default ViewPhoto

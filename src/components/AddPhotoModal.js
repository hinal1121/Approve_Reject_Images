import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import usePhotos from '../hooks/usePhotos'
import { selectCurrentVisibleModal } from '../redux/reducers/ui'
import Modal from './Modal'

const AddPhotoModal = () => {
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false)

  const isOpen =
    useSelector((state) => selectCurrentVisibleModal(state)) === 'add-photo'

  const photos = usePhotos()

  useEffect(() => {
    // once add photo modal is opened, present new photo to user
    if (isOpen) {
      photos.presentNewPhoto()
    }
  }, [isOpen])

  const handleApproveBtnClick = () => {
    setIsPhotoLoaded(false)
    photos.approvePhotoPresented()
    photos.presentNewPhoto()
  }

  const handleRejectBtnClick = () => {
    setIsPhotoLoaded(false)
    photos.rejectPhotoPresented()
    photos.presentNewPhoto()
  }

  const renderProgress = photos.isFetching || !isPhotoLoaded

  return (
    <Modal isOpen={isOpen} title='Add Photo'>
      <StyledApprovedLabel variant='body1'>
        APPROVED IMAGES ({photos.numApproved})
      </StyledApprovedLabel>

      <StyledApprovedPhotosList>
        {photos.approvedPhotos.map((photo) => (
          <StyledApprovedPhotoContainer key={photo.id}>
            <StyledApprovedPhoto component='img' src={photo.url} />
          </StyledApprovedPhotoContainer>
        ))}
      </StyledApprovedPhotosList>

      <StyledPhotoContainer>
        {
          renderProgress && (
            <CircularProgress
              sx={{ 
                position: 'absolute',
                top: '10px',
                left: '10px',
              }}
            />
          )
        }
        {
          photos.photoPresented && !photos.isFetching && (
            <StyledPhotoPresented
              component='img'
              src={photos.photoPresented.url}
              onLoad={() => setIsPhotoLoaded(true)}
              style={{ ...(!isPhotoLoaded && { display: 'none' }) }}
            />
          )
        }
      </StyledPhotoContainer>

      <StyledButtonsContainer>
        <StyledButton
          color='error'
          variant='contained'
          onClick={handleRejectBtnClick}
          disabled={!(photos.photoPresented && isPhotoLoaded)}
        >
          Reject
        </StyledButton>
        <StyledButton
          color='success'
          variant='contained'
          onClick={handleApproveBtnClick}
          disabled={!(photos.photoPresented && isPhotoLoaded)}
        >
          Approve
        </StyledButton>
      </StyledButtonsContainer>
    </Modal>
  )
}

const StyledApprovedLabel = styled(Typography)(({ theme }) => 
  theme.unstable_sx({
    color: 'primary.main',
    fontWeight: '600',
    userSelect: 'none',
  })
)

const StyledApprovedPhotosList = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    display: 'flex',
    mt: '4px',
    columnGap: '4px',
    overflowX: 'auto',
    pb: '4px',
  })
)

const StyledApprovedPhotoContainer = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    position: 'relative',
    flex: '0 0 70px',
    aspectRatio: '3 / 2',
    borderRadius: '3px',
    overflow: 'hidden',
  })
)

const StyledApprovedPhoto = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    width: '100%',
    height: '100%',
  })
)

const StyledPhotoContainer = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    mt: '4px',
    width: '100%',
    aspectRatio: '1 / 1',
    border: '2px solid black',
    borderRadius: '3px',
    overflow: 'hidden',
    position: 'relative'
  })
)

const StyledPhotoPresented = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    height: '100%',
    width: '100%',
  })
)

const StyledButtonsContainer = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    mt: '4px',
    display: 'flex',
    columnGap: '4px',
  })
)

const StyledButton = styled(Button)(({ theme }) => 
  theme.unstable_sx({
    flex: '1 0 0',
  })
)

export default AddPhotoModal

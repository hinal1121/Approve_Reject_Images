import Box from '@mui/material/Box'
import { styled } from '@mui/system'
import usePhotos from '../hooks/usePhotos'

const RejectedPhotos = ({}) => {
  const photos = usePhotos()

  return (
    <StyledWrapper>
      {photos.rejectedPhotos.map((photo) => (
        <StyledPhoto
          key={photo.id}
          component='img'
          src={photo.url}
          onClick={() => photos.viewPhoto(photo.id)}
        />
      ))}
    </StyledWrapper>
  )
}

const StyledWrapper = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    mt: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '5px',
  })
)

const StyledPhoto = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    component: 'img',
    borderRadius: '3px',
    aspectRatio: '3 / 2',
    ':hover': {
      transform: 'scale(1.02)',
    },
  })
)

export default RejectedPhotos

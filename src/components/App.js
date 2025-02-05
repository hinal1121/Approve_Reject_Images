import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { useEffect } from 'react'
import useAlert from '../hooks/useAlert'
import usePhotos from '../hooks/usePhotos'
import AddPhotoModal from './AddPhotoModal'
import Alert from './Alert'
import ApprovedPhotos from './ApprovedPhotos'
import Header from './Header'
import RejectedPhotos from './RejectedPhotos'
import ViewPhoto from './ViewPhoto'

const App = () => {
  const photos = usePhotos()

  const alert = useAlert()

  // order of useEffect hooks below VERY is important!!!
  useEffect(() => {
    loadDataFromStorage()
  }, [])

  useEffect(() => {
    updateStorage()
  }, [photos.allPhotos])

  const loadDataFromStorage = () => {
    const list = JSON.parse(localStorage.getItem('photos'))

    if (Array.isArray(list)) {
      photos.setPhotos(list)

      alert.success('Loaded photos from localStorage')
    }
  }

  const updateStorage = () => {
    localStorage.setItem('photos', JSON.stringify(photos.allPhotos))
  }

  return (
    <>
      <Box sx={{ pt: '60px' }}>
        <Header />
        <Container maxWidth='lg'>
          <StyledTitleContainer elevation={2}>
            <Typography variant='h4'>
              Approved ({photos.numApproved})
            </Typography>
          </StyledTitleContainer>
          <ApprovedPhotos />
          <StyledTitleContainer elevation={2} marginTop>
            <Typography variant='h4'>
              Rejected ({photos.numRejected})
            </Typography>
          </StyledTitleContainer>
          <RejectedPhotos />
        </Container>
      </Box>

      <AddPhotoModal />
      <Alert />
      <ViewPhoto />
    </>
  )
}

const StyledTitleContainer = styled(Paper)(({ theme, marginTop }) =>
  theme.unstable_sx({
    padding: '5px',
    ...(marginTop && { mt: '4px' }),
  })
)

export default App

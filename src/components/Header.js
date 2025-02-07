import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import logo from '../assets/logo.jpg'
import usePhotos from '../hooks/usePhotos'
import { uiActions } from '../redux/reducers/ui'

const Header = () => {

  const dispatch = useDispatch()

  const photos = usePhotos()

  const handleAddPhotoBtnClick = () => {
    dispatch(uiActions.openModal('add-photo'))
  }

  const handleResetBtnClick = () => {
    photos.setPhotos([])
  }

  return (
    <>
      <StyledHeader>
        <Container
          maxWidth='lg'
          sx={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <StyledLogo component='img' src={logo} />

          <StyledButtonsContainer>
            <Button
              onClick={handleResetBtnClick}
              endIcon={<AddIcon />}
              variant='outlined'
              color='error'
            >
              Reset App
            </Button>
            <Button
              onClick={handleAddPhotoBtnClick}
              endIcon={<AddIcon />}
              variant='outlined'
            >
              New
            </Button>
          </StyledButtonsContainer>
        </Container>
      </StyledHeader>
    </>
  )
}

const StyledHeader = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    boxShadow: 2,
    bgcolor: 'white',
    zIndex: '1250',
  })
)

const StyledLogo = styled(Box)(({ theme }) => 
  theme.unstable_sx({
    height: '90%',
  })
)

const StyledButtonsContainer = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    columnGap: '3px',
  }) 
)

export default Header

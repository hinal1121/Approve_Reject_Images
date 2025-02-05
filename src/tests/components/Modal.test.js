import { screen } from '@testing-library/react'
import Modal from '../../components/Modal'
import { customRender } from '../utils'

describe('<Modal />', () => {
  test('should render', () => {
    customRender(<Modal isOpen={true} title='daler' children='saidov daler' />)
  })

  test('title should be injected and visible', () => {
    customRender(
      <Modal isOpen={true} title='Add photo' children='saidov daler' />
    )

    expect(screen.getByText('Add photo')).toBeInTheDocument()
    expect(screen.getByText('Add photo')).toBeVisible()
  })

  test('childen prop should be injected and visible', () => {
    customRender(
      <Modal
        isOpen={true}
        title='Add photo'
        children={<h1 role='modal-body'>I am body</h1>}
      />
    )

    expect(screen.getByRole('modal-body')).toBeInTheDocument()
    expect(screen.getByRole('modal-body')).toBeVisible()
  })
})

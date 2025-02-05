import {
  selectAlert,
  selectCurrentVisibleModal,
  selectPhotoViewing_id,
} from '../../redux/reducers/ui'

const mockState = {
  ui: {
    currentVisibleModal: 'add-photo',
    alert: {
      isOpen: true,
      severity: 'success',
      message: 'Successfully added photo',
    },
    photoViewing_id: 'id003',
  },
}

describe('ui selectors', () => {
  test('select current visible modal', () => {
    expect(selectCurrentVisibleModal(mockState)).toEqual('add-photo')
  })

  test('select alert', () => {
    expect(selectAlert(mockState)).toEqual({
      isOpen: true,
      severity: 'success',
      message: 'Successfully added photo',
    })
  })

  test('select photo viewing id', () => {
    expect(selectPhotoViewing_id(mockState)).toEqual('id003')
  })
})

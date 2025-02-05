import {
  selectApprovedPhotos,
  selectPhotoById,
  selectPhotos,
  selectRejectedPhotos,
} from '../../redux/reducers/photos'

const mockState = {
  photos: {
    list: [
      { id: 'id001', url: 'url1', isApproved: true },
      { id: 'id002', url: 'url2', isApproved: false },
      { id: 'id003', url: 'url3', isApproved: true },
      { id: 'id004', url: 'url4', isApproved: false },
    ],
  },
}

describe('photos selectors', () => {
  test('select all photos', () => {
    expect(selectPhotos(mockState)).toEqual([
      { id: 'id001', url: 'url1', isApproved: true },
      { id: 'id002', url: 'url2', isApproved: false },
      { id: 'id003', url: 'url3', isApproved: true },
      { id: 'id004', url: 'url4', isApproved: false },
    ])
  })

  test('select approved photos', () => {
    expect(selectApprovedPhotos(mockState)).toEqual([
      { id: 'id001', url: 'url1', isApproved: true },
      { id: 'id003', url: 'url3', isApproved: true },
    ])
  })

  test('select rejected photos', () => {
    expect(selectRejectedPhotos(mockState)).toEqual([
      { id: 'id002', url: 'url2', isApproved: false },
      { id: 'id004', url: 'url4', isApproved: false },
    ])
  })

  test('select photo by id', () => {
    expect(selectPhotoById(mockState, 'id002')).toEqual({
      id: 'id002',
      url: 'url2',
      isApproved: false,
    })
    expect(selectPhotoById(mockState, 'id003')).toEqual({
      id: 'id003',
      url: 'url3',
      isApproved: true,
    })
  })
})

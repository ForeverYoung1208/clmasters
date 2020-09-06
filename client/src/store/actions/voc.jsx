import { FETCH_VOC_OK, FETCH_VOC_ERROR} from './actionTypes'
import { loaderShow, loaderHide } from './main.jsx'
import  { apiGetVoc } from '../../shared/js/api'

export const fetchVoc = () => {
	return async (dispatch) => {
		dispatch(loaderShow('voc'))
    try {
      const { voc } = await apiGetVoc()
      dispatch(fetchVocOk(voc))
    } catch (e) {
      dispatch(fetchVocError(e))
    } finally {
      dispatch(loaderHide('voc'))
    }
	}
}


const fetchVocOk = (voc) => {
	return {
    type: FETCH_VOC_OK,
    payload: { voc }
	}    
}

const fetchVocError = (error) => {
  console.log('[error]', error)
  return {
    type: FETCH_VOC_ERROR
  }
}


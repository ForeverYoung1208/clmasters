import { FETCH_VOC_OK } from './actionTypes'

export const fetchVocOk = (voc) => {
	return {
    type: FETCH_VOC_OK,
    voc
	}    
}

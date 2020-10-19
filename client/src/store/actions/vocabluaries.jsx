import { FETCH_VOCABLUARIES_OK } from './actionTypes'

export const fetchVocabluariesOk = (vocabluaries) => {
	return {
    type: FETCH_VOCABLUARIES_OK,
    vocabluaries
	}    
}

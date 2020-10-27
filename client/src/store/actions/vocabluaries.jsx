// import { FETCH_VOCABLUARIES_OK } from './actionTypes'

import { FETCH_VOCABLUARIES_OK } from "./actionTypes/vocabluaries"

export const fetchVocabluariesOk = (vocabluaries) => {
	return {
    type: FETCH_VOCABLUARIES_OK,
    vocabluaries
	}    
}

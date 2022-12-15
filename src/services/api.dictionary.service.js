import { useHttp } from "../hooks/http.hooks";
const useApiDictionaryService = () => {
	const _apiBase = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
	const { loading, request, error, clearError } = useHttp()
	const getDefinitionAndExample = async (word) => {
		const res = await request(`${_apiBase}${word}`)
		return _transformDefinitionAndExample(res[0].meanings[0].definitions[0])
	}
	const getTranscriptionAndAudio = async (word) => {
		const res = await request(`${_apiBase}${word}`)
		return _transformTranscriptionAndAudio(res[0], word)
	}
	const _transformTranscriptionAndAudio = (data, word) => {
		if (word.includes('%20')) {
			return {
				transcription: word.replace(/%20/g, ' '),
				audio: ''
			}

		}
		const audio = data.phonetics.filter(item => item.audio)
		return {
			transcription: data.phonetics[1].text,
			audio: audio[0].audio
		}
	}
	const _transformDefinitionAndExample = (data) => {
		return {
			definition: data.definition,
			example: data.example
		}

	}
	return { loading, error, getDefinitionAndExample, getTranscriptionAndAudio }
}
export default useApiDictionaryService
import axios from 'axios';

const apiUrl = 'https://api.stackexchange.com/2.2/';

export default {
	fetchQuestions: (page = 1) => axios.get(apiUrl + `/questions?order=desc&sort=activity&site=stackoverflow&filter=withbody&page=${page}`)
}
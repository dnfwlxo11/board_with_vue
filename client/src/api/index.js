import axios from 'axios'

const axiosService = axios.create({
    baseURL: 'http://daechu.iptime.org:19000'
})

function createContent(data) {
    return axiosService.post('/api/board/newContent', data)
}

function getContent() {
    return axiosService.get('/api/board/updateContent')
}

function loadContent(seq) {
    return axiosService.get(`/api/board/loadContent/${seq}`)
}

function deleteContent(seq, data) {
    return axiosService.post(`/api/board/deleteContent/${seq}`, data)
}

function addComment(seq, data) {
    return axiosService.post(`/api/comment/addComment/${seq}`, data)
}

function deleteComment(seq, data) {
    return axiosService.post(`/api/comment/deleteComment/${seq}`, data)
}

export {
    createContent,
    getContent,
    loadContent,
    deleteContent,
    addComment,
    deleteComment
}
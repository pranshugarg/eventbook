import sampleData from './sampleData';

//to fetch events and showing them on our page without setting the initialState in our reducer
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchSampleData = () => {
    return delay(1000).then(() => {
        return Promise.resolve(sampleData)
    })
}
//we will use this method to get some events 
// and we will populate them in our store
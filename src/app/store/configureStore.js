import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';    
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk'

export const configureStore = (preloadedState) => {
    //we want to pass middlewares to our store 
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancers);


    //parameters => reducer, enhancer
    //second parameter we can add is a preloaded state
    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    );

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const newRootReducer = require('../reducers/rootReducer').default;
                store.replaceReducer(newRootReducer)
            })
        }
    }

    return store;
} 
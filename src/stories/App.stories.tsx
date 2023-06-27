import React from 'react';
import App from "../App/App";
import {ProviderDecorator} from './ProviderDecorator';


export default {
    title: 'App Component',
    component: App,
    decorators: [ProviderDecorator]
}

export const AppStory = () => {
    return <App demo={true}/>
}
import React from 'react';
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {ProviderDecorator} from './ProviderDecorator';

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
    decorators: [ProviderDecorator]
}

export const AddItemFormStory = () => {
    return <AddItemForm/>
}
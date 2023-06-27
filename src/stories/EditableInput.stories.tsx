import React from 'react';
import {action} from '@storybook/addon-actions';
import EditableInput from '../components/EditableInput/EditableInput';

export default {
    title: 'EditableInput Component',
    component: EditableInput
}

const callBack = action('Title changed');

export const EditableInputStory = () => {
    return <EditableInput title='title' callBack={callBack}/>
}
import React from 'react';
// import configureStore from 'redux-mock-store';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Navigation } from '../common/Navigation';
import NavigationItem from '../common/NavigationItem';

configure({ adapter: new Adapter() });

// const initialState={};
// const mockStore=configureStore();

// let store;
// beforeEach(()=>{
//     store=mockStore(initialState)
// })

const auth = {
    isAuthenticated: false,
    user: {}
}

describe('<Navigation />', () => {
    it('should render 4 NavigationItem components if not authenticated', () => {
        const wrapper = shallow(<Navigation auth={auth} />);
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    })

    it('should render 2 NavigationItem components if authenticated', () => {
        auth.isAuthenticated = true;
        auth.user.name = 'ABC';
        const wrapper = shallow(<Navigation auth={auth} />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render logout if authenticated', () => {
        auth.isAuthenticated = true;
        auth.user.name = 'ABC';
        const wrapper = shallow(<Navigation auth={auth} />);
        expect(wrapper.find('#nav-item-logout')).toHaveLength(1);
    })
})
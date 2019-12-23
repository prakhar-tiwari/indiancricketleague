import React from 'react';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Matches} from '../matches/Matches';
import Match from '../matches/Match';

const match={
    matches:[]
}

configure({adapter:new Adapter()});

describe('<Navigation />',()=>{

    it('should not render Match component when matches are null',()=>{
        const wrapper=shallow(<Matches match={match} getMatchData={()=> {}} />);
        expect(wrapper.find(Match)).toHaveLength(0);
    })
})
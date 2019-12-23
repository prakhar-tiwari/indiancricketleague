import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { MatchDisplay } from '../matches/MatchDisplay';
import Loader from '../common/Loader';

const match={
    loading:true
}

describe('<MatchDisplay>', () => {
    it('should render Loader component when loading props is true', () => {
        const wrapper = shallow(<MatchDisplay getMatchData={() => {}} match={match} />);
        expect(wrapper.find(Loader)).toHaveLength(1);
    })

    it('should render Matches component when loading props is false', () => {
        match.loading=false;
        const wrapper = shallow(<MatchDisplay getMatchData={() => {}} match={match} />);
        expect(wrapper.find('#matches')).toHaveLength(1);
    })
})
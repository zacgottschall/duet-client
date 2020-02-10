import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as types from '../../../constants/actionTypes';
import Page from '../../Page';
// import FilterResults from 'react-filter-search';
import { fetchUser1, fetchUser2 } from '../../../actions';
import { addGroup, search } from '../../../utils/backendUtils';
import { func } from 'prop-types';

const Compare = ({ jumpToPage }) => {

    const dispatch = useDispatch();
    const { user_1 } = useSelector((state) => state.users);
    const [showPopup, setShowPopup] = useState(false);

    const [users, setUsers] = useState([]);

    const [topBarIsSearching, setTopBarIsSearching] = useState(false);
    const [topUser, setTopUser] = useState('Me');
    const [topQueryVal, setTopQueryVal] = useState('Me');

    const [bottomBarIsSearching, setBottomBarIsSearching] = useState(false);
    const [bottomUser, setBottomUser] = useState('');
    const [bottomQueryVal, setBottomQueryVal] = useState('');

    const [groupNameVal, setGroupNameVal] = useState('');

    // useEffect(() => {
    //     fetch('https://cs98-duet.herokuapp.com/getall')
    //       .then(response => response.json())
    //       .then(json => setUsers(json));
    //   }, []);

    const renderPopup = () => {
        return (
            <div id="PopupBackground">
                <button id="close" onClick={() => handleClose()}>x</button>
                <h3>name your group</h3>
                <input type="text" value={groupNameVal} onChange={handleGroupNameChange}></input>
                <button onClick={() => handleAddGroupClick()}>create</button>
            </div>
        )
    }

    const handleClose = () => {
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    const handleAddGroupClick = () => {
        addGroup(groupNameVal, user_1.display_name)
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    const handleGroupNameChange = (e) => {
        const { value } = e.target;
        setGroupNameVal(value)
    };

    const handleTopChange = (e) => {
        const { value } = e.target;
        setTopBarIsSearching(true)
        setTopQueryVal(value)
        search(value).then(setUsers)
    };

    const handleTopUserSelect = (user) => {
        setTopUser(user.id);
        setTopBarIsSearching(false);
        setTopQueryVal(user.display_name);
    }

    const handleBottomChange = (e) => {
        const { value } = e.target;
        setBottomBarIsSearching(true)
        setBottomQueryVal(value)
        search(value).then(setUsers)
    };

    const handleBottomUserSelect = (user) => {
        setBottomUser(user.id);
        setBottomBarIsSearching(false);
        setBottomQueryVal(user.display_name);
    }

    const handleGoClick = () => {
        if ( topUser != 'Me' ) {
            dispatch(fetchUser1(topUser));
        }
        dispatch(fetchUser2(bottomUser));
        jumpToPage(3)
    }

    return (
        <Page background={'lightblue'}>
            <div id="background"/>
            <div id="content">
                <h3>compare...</h3>
                <div>
                    <input type="text" value={topQueryVal} onClick={() => setTopQueryVal('')} onChange={handleTopChange} />
                    {topBarIsSearching && 
                        <div>
                        <span onClick={() => handleTopUserSelect({ display_name: 'Me'})}>Me</span>
                        {users.map(user => (
                            <div key={user.id}>
                                <span onClick={() => handleTopUserSelect(user)}>{user.display_name}</span>
                            </div>
                        ))}
                        </div>
                    }
                </div>
                <h3>to...</h3>
                <div>
                    <input type="text" value={bottomQueryVal} onClick={() => setBottomQueryVal('')} onChange={handleBottomChange} />
                    {bottomBarIsSearching && 
                        <div>
                            {users.map(user => (
                                <div key={user.id}>
                                <span onClick={() => handleBottomUserSelect(user)}>{user.display_name}</span>
                                </div>
                            ))}
                        </div> 
                    }
                </div>
                <button onClick={handleGoClick}>go!</button>
                <button id="smallLink" onClick={() => setShowPopup(!showPopup)}>or create a group</button>
            </div>
            
            { showPopup &&
                <div className="popup">
                    {renderPopup()}
                </div>
            }
        </Page>
    )
}

Compare.propTypes = {
    jumpToPage: func
}

export default Compare;
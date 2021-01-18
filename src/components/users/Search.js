import React, { useState} from 'react';
import PropTypes from 'prop-types'


const Search = ({searchUsers, clearUsers,showClear,setAlert}) => {
  const [text, setText] = useState('');
  
  const onSubmitHandler = e => {
    e.preventDefault();
    if(text === '')
    {
      setAlert('Please type something' , 'light')
    }
    else{
      searchUsers(text);
      setText('');  
    }
  };

 const onChangeHandler = e => setText(e.target.value);
  
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChangeHandler}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && <button
          onClick={clearUsers}
          className='btn btn-light btn-block'
        >Clear</button>}
      
    </div>
  );
};

Search.propTypes = {
  searchUsers : PropTypes.func.isRequired,
  clearUsers : PropTypes.func.isRequired,
  showClear : PropTypes.bool.isRequired,
  setAlert : PropTypes.func.isRequired
}

export default Search;

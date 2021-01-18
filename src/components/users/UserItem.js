import React from 'react';
import { Link } from 'react-router-dom';
const UserItem = ({user : { login, html_url, avatar_url }})=> {    
        return (
            <div>
                <img src={avatar_url}
                    alt=""
                    className='round-img'
                    style={{ width: '60px'}}
                />
                <div>
                    <h3>{login}</h3>
                </div>
                <div>
                <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>More info</Link>
                </div>
            </div>
            
        )
}

export default UserItem
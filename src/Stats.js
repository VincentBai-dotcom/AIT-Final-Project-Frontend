import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Stats(){
    const [stats, setStats] = useState([]);
    const [filter, setFilter] = useState({});
    const [loading, setLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        // Update the document title using the browser API
        api.get('stats/', {
            params:{
                username: localStorage.getItem('username')
            }
        })
        .then(res => {
            setStats(res["data"]);
            console.log(stats);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            history('/login');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filter]);

    function renderStats(e,key){
        return (<p key = {key}>{e["quality"]+e["correct"]+e["total"]}</p>);
    }

    return(
        <>
            {!loading && stats.map(renderStats)}
        </>
    );
}

export default Stats;
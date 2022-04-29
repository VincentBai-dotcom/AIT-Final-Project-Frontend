import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Stats(){
    const [stats, setStats] = useState([]);
    const [type, setType] = useState("chord");
    const [loading, setLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        // Update the document title using the browser API
        api.get('stats/', {
            params:{
                username: localStorage.getItem('username'),
                type: type
            }
        })
        .then(res => {
            setStats(res["data"]);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            history('/login');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type]);

    function renderStats(e,key){
        return (
            <tr key = {key} className = {key % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key+1}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.quality}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.round((e.correct/e.total*100 + Number.EPSILON) * 100) / 100}%</td>
            </tr>
        );
    }
    function renderTable(){
        if(loading){
            return (<></>);
        }
            
        else{
            return(
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                            
                                <select value = {type} onChange = {(e) => setType(e.target.value)}>
                                    <option value = "chord">Chord</option>
                                    <option value = "interval">Interval</option>
                                </select>
                                <table>
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Quality</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Accuracy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.map(renderStats)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return(
        <>
            {renderTable()}
        </>
    );
}

export default Stats;
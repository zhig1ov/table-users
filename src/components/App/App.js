import './App.css';
import React, {useEffect, useState} from "react";
import {Table} from "../Table/Table";
import {getUsers} from "../../utils/fetchData";
import {Loader} from "../Loader/Loader";


function App() {
    const [data, setData] = useState(undefined);

    useEffect(() => {
        getUsers("https://dummyjson.com/users", setData)
    }, []);

    return (
        <div className='app'>
            {!data && (<Loader />)}
            {data && (<Table data={data} />)}
        </div>
    )
}

export default App;

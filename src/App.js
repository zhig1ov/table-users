
import './App.css';
import React, {useEffect, useState} from "react";

import {Table} from "./components/Table/Table";
import {getUsers, usersData} from "./utils/fetchData";
import {Loader} from "./components/Loader/Loader";
import {COLUMNS} from "./utils/columns";

function App() {
    const [data, setData] = useState(undefined)


    useEffect(() => {
        getUsers("https://dummyjson.com/users", setData)
    }, [])


    return (
        <div className='app'>
            {!data && (<Loader />)}
            {data && (<Table data={data} />)}
        </div>
    )
}

export default App;

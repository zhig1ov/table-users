import React, {useState} from 'react';
import options from '../../utils/options.json';
import {getUsers} from "../../utils/fetchData";
import './Table.css';
import Select from "../Select/Select";
import {Modal} from "../Modal/Modal";
import {COLUMNS as columns} from "../../utils/columns";

export const Table = ({ data }) => {
    const [userData, setUserData] = useState(data);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputData, setInputData] = useState('');
    const [searchData, setSearchData] = useState([])
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [idx, setIdx] = useState('');


    let result = userData;
    if (searchData.length !== 0) {
        result = searchData;
    }

    //Sorting
    if(sortColumn !== '') {
        const sort = [...data]
        const sortingData = sort.sort((firstRow, otherRow) => {
            return firstRow[sortColumn].toString().localeCompare(otherRow[sortColumn].toString());
        })
        if (sortOrder === 'asc') {
            result = sortingData;
        }

        if(sortOrder === 'desc') {
            result = sortingData.reverse();
        }

        if(sortOrder === 'init') {
            result = userData;
        }
    }

    //Pagination
    const startPoint = (currentPage - 1) * rowsPerPage;
    const endPoint = currentPage * rowsPerPage;
    const totalPage = Math.ceil(result.length / rowsPerPage);
    result = result.slice(startPoint, endPoint);


    const prevPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if(currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const onSelect = (e) => {
        setRowsPerPage(e.target.value);
    }

    const onChangeHandler =  (e) => {
        setInputData(e.target.value);
        getUsers(`https://dummyjson.com/users/search?q=`, setSearchData, inputData)
    }

    const onSort = (column) => {
        if (sortColumn === column.field) {
            if(sortOrder === 'asc') {
                setSortOrder('desc')
            } else if(sortOrder === 'desc') {
                setSortOrder('init')
            } else {
                setSortOrder('asc')
            }
        } else {
            setSortColumn((column.field))
            setSortOrder('asc')
        }
    }

    return (
       <>
           <div className="DataTable">

               <input
                   className='search-input'
                   onChange={onChangeHandler}
                   placeholder='Type to search'
               />
               <table className='table'>
                   <thead>
                   <tr>
                       {columns.map(column => (
                           <th key={`column${column.field}`} className='table-th'>
                               <button
                                   onClick={() => onSort(column)}
                                   className='sort-btn'
                               >
                                   {column.title}
                                   {sortColumn === column.field ?
                                       sortOrder === 'asc' ?
                                           '↑' : sortOrder === 'desc' ?
                                               '↓' : null : null}
                               </button>
                           </th>)
                       )}
                   </tr>
                   </thead>
                   <tbody>
                   {result.map((dataRow, idx) => (
                           <tr onClick={() => {

                               setModalActive(true)
                               setIdx(idx)
                           }}
                               key={`data${idx}`}>
                               {columns.map(column => (
                                   <td key={`col${column.field}`} className='table-td'>{dataRow[column.field]}</td>
                               ))}
                           </tr>
                       )
                   )}
                   </tbody>
               </table>
               <footer className='footer'>
                   <Select onSelect={onSelect} options={options}/>
                   <div className='pagination'>
                       <button className='pagination-btn' onClick={prevPage}>{'←'}</button>
                       <button className='pagination-btn' onClick={nextPage}>{'→'}</button>
                   </div>
               </footer>
           </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                idx={idx}
                data={result}
            />
       </>
    );
};

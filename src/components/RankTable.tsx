import React, {useEffect, useState} from "react";
import {useMemo} from "react";
import {useSortBy, useTable} from "react-table";
import styled from "styled-components";
import axios from "axios";
import {Player} from "./type";

interface Props {
    players: [Player]
}
const Table = styled.table`
  font-family: "Noto Sans Regular";
  width: 100%;
  border-collapse: collapse;
`

const Thead = styled.thead`
  border: 1px solid black;
  text-align: center;
`

const Th = styled.th`
  padding: 5px 0px;
  border: 1px solid black;
`
const Td = styled.td`
  padding: 5px 0px;
  border: 1px solid black;
  text-align: center;
  width: 25%;
`

const Tr = styled.tr`
  background-color: lightgrey;
`
export const COLUMNS = [
    {
        Header : '선수 이름',
        accessor : 'playerName'
    },
    {
        Header : '경기 수',
        accessor: 'appearances'
    },
    {
        Header : '득점',
        accessor : 'goals'
    },
    {
        Header : '도움',
        accessor: 'assists'
    }
];

export const MOCK_DATA =  [
        {
            "playerId": 6,
            "playerName": "최종민",
            "birthDate": null,
            "height": 170,
            "weight": 69,
            "appearances": 1,
            "goals": 3,
            "assists": 1,
            "position": "FW",
            "backNum": 7,
            "imageUrl": null,
            "description": null
        },
        {
            "playerId": 5,
            "playerName": "김정호",
            "birthDate": null,
            "height": 170,
            "weight": 69,
            "appearances": 1,
            "goals": 0,
            "assists": 1,
            "position": "DF",
            "backNum": 12,
            "imageUrl": null,
            "description": null
        },
        {
            "playerId": 2,
            "playerName": "정형우",
            "birthDate": null,
            "height": 178,
            "weight": 74,
            "appearances": 0,
            "goals": 0,
            "assists": 0,
            "position": "DF",
            "backNum": 6,
            "imageUrl": null,
            "description": null
        },
        {
            "playerId": 3,
            "playerName": "양원영",
            "birthDate": null,
            "height": 170,
            "weight": 69,
            "appearances": 0,
            "goals": 0,
            "assists": 0,
            "position": "DF",
            "backNum": 30,
            "imageUrl": null,
            "description": null
        },
        {
            "playerId": 4,
            "playerName": "양원영",
            "birthDate": null,
            "height": 170,
            "weight": 69,
            "appearances": 0,
            "goals": 0,
            "assists": 0,
            "position": "DF",
            "backNum": 32,
            "imageUrl": null,
            "description": null
        }
    ]
const RankTable = (props:Props) => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.players, [props]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        // @ts-ignore
        columns,
        // @ts-ignore
        data,}, useSortBy);

    return (

        <div>
            <Table {...getTableProps}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? " ⬇︎" : " ⬆︎") : ""}
                                    </span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>

                <tbody {...getTableBodyProps}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <Td{...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </Td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    )
};

export default RankTable;
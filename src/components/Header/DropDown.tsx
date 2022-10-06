import {useEffect, useState} from "react";

type DropDownProps = {
    positions: string[];
    showDropDown: boolean;
    toggleDropDown: Function;
    positionSelection: Function;
}

const DropDown = ({positions, positionSelection} : DropDownProps) => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const onClickHandler = (position:string) => {
        positionSelection(position);
    };

    useEffect(() => {
        setShowDropDown(showDropDown);
    }, [showDropDown]);


}
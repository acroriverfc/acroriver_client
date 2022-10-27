import React, {useState} from "react";
import Card from "../../components/Card";
import SubBar from "../../components/Header/SubBar";
import AddPlayerModal from "../../components/AddPlayerModal";

const Players = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div>
            <SubBar/>
            <Card/>
            <button onClick={openModal}>
                선수 추가
            </button>
            <AddPlayerModal open={modalOpen} close={closeModal}/>
        </div>
    );
};

export default Players;
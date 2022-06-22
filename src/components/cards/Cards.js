import React, { useEffect, useState } from "react";
import "./Cards.css";
import Modal from "react-modal";

export const Cards = () => {
  const [modal, setmodal] = useState([]);
  const getData = async () => {
    const response = await fetch(
      "https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts"
    );
    setmodal(await response.json());
    // console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const customeStyle = {
    content: {
      top: "auto",
      left: "auto",
      right: "auto",
    },
    overlay: {
      backdropFilter: "blur(0.1px)",

      backgroundColor: "rgba(0 ,0,0,0.1)",
    },
  };
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {modal.map((attr) => {
        return (
          <>
            <div className="card">
              <div className="img">
                <img src={attr.thumbnail.small} alt="" />
                <div className="overlay">
                  <button onClick={() => setModalOpen(true)}>Learn More</button>
                </div>
              </div>
              <div className="content">
                <div className="title">
                  <span></span>
                  <h2>{attr.title}</h2>
                </div>
                {attr.content}
                <div className="footer">
                  <div className="author-role">
                    {attr.author.name} - {attr.author.role}
                  </div>
                  <div className="date">Nov 25, 2020</div>
                </div>
              </div>
            </div>
            <Modal isOpen={modalOpen} style={customeStyle}>
              <div className="card-modal">
                <div className="header-close">
                  <button
                    className="close"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                    onRequestChange={() => setModalOpen(false)}
                  >
                    x
                  </button>
                </div>
                <div className="img">
                  <img
                    className="modal-image"
                    src={attr.thumbnail.large}
                    alt=""
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <span></span>
                    <h2>{attr.title}</h2>
                  </div>
                  {attr.content}
                  <div className="footer">
                    <div className="author-role avatar-author">
                      <img
                        className="modal-img"
                        src={attr.author.avatar}
                        alt=""
                      />
                      {attr.author.name} - {attr.author.role}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </>
        );
      })}
    </>
  );
};

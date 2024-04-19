"use client"
import React, { useState, useEffect } from "react";

const Gallery = ({ images, thumbs }) => {
    const IMAGES = images;
    const THUMBS = images;

    const [currentImage, setCurrentImage] = useState(IMAGES[0] ? IMAGES[0] : null);

    const [open, setOpen] = useState(false);
    const handleClick = (index) => {
        setCurrentImage(IMAGES[index]);
    };
    const handleToggle = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const removeActivatedClass = (parent) => {
        parent.childNodes.forEach((node) => {
            node.childNodes[0].classList.contains("activated") &&
                node.childNodes[0].classList.remove("activated");
        });
    };

    return (
        <section className="gallery-holder hide-in-mobile">
            <section className="gallery">
                <div className="image">
                    <img className="object-cover" src={currentImage} alt="product-1" onClick={handleToggle} />
                </div>
                <div className="thumbnails">
                    {THUMBS?.map((th, index) => {
                        return (
                            <div
                                className="img-holder"
                                key={index}
                                onClick={(e) => {
                                    handleClick(index);
                                    removeActivatedClass(e.currentTarget.parentNode);
                                    e.currentTarget.childNodes[0].classList.toggle("activated");
                                }}
                            >
                                <div className={`outlay ${index === 0 && "activated"}`}></div>
                                <img className="object-cover" src={th} alt={`product-${index + 1}`} />
                            </div>
                        );
                    })}
                </div>
            </section>
        </section>
    );
};

export default Gallery;
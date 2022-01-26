import React from 'react';

const Index = () => {
    return (
        <div className="hero">
            <div className="card bg-dark text-white border-0">
                <img src="https://images.pexels.com/photos/631477/pexels-photo-631477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img" alt="background" height="550px" />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">Chào mừng bạn</h5>
                        <p className="card-text lead fs-2">Mua nhiều lì xì cũng không nhiều.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;